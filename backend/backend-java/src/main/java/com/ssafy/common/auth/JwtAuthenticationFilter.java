package com.ssafy.common.auth;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.ssafy.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.api.service.UserService;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.common.util.ResponseBodyWriteUtil;

/**
 * 요청 헤더에 jwt 토큰이 있는 경우, 토큰 검증 및 인증 처리 로직 정의.
 */

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
	private UserService userService;


    private JwtTokenUtil jwtTokenUtil;

	public JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService, JwtTokenUtil jwtTokenUtil) {
		super(authenticationManager);
		this.userService = userService;
		this.jwtTokenUtil = jwtTokenUtil;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {


		// Read the Authorization header, where the JWT Token should be
        String header = request.getHeader(JwtTokenUtil.HEADER_STRING);
        System.out.println(header);


        // If header does not contain BEARER or is null delegate to Spring impl and exit
        if (header == null || !header.startsWith(JwtTokenUtil.TOKEN_PREFIX)) {
            System.out.println("1");
            filterChain.doFilter(request, response);
            return;
        }


        try {
            // If header is present, try grab user principal from database and perform authorization
            Authentication authentication = getAuthentication(request,response);
            // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
            SecurityContextHolder.getContext().setAuthentication(authentication);


        } catch (Exception ex) {
            ResponseBodyWriteUtil.sendError(request, response, ex);
            return;
        }

        filterChain.doFilter(request, response);
	}
	
	@Transactional(readOnly = true)
    public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        String refreshToken = request.getHeader(JwtTokenUtil.REFRESH_STRING);
        System.out.println("2");
        System.out.println(token);
        System.out.println(refreshToken);
        token = token.replace(JwtTokenUtil.TOKEN_PREFIX, "");
        System.out.println(token);
        // 요청 헤더에 Authorization 키값에 jwt 토큰이 포함된 경우에만, 토큰 검증 및 인증 처리 로직 실행.
        System.out.println(jwtTokenUtil.validateToken(token));

        // accessToken이 NULL 이 아니고, 만료시간을 벗어나지 않았을 때,
        if (token != null && !jwtTokenUtil.validateToken(token)) {  // 범위 벗어나면 true를 반환

            System.out.println("3");
            // parse the token and validate it (decode)
            JWTVerifier verifier = JwtTokenUtil.getVerifier();
            JwtTokenUtil.handleError(token);
            DecodedJWT decodedJWT = verifier.verify(token);
            String userId = decodedJWT.getSubject();
            System.out.println();

            // Search in the DB if we find the user by token subject (username)
            // If so, then grab user details and create spring auth token using username, pass, authorities/roles
            if (userId != null) {
                    // jwt 토큰에 포함된 계정 정보(userId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
            		User user = userService.getUserByEmail(userId);
                if(user != null) {
                        // response에 accesstoken 추가.
                        String accessToken = JwtTokenUtil.TOKEN_PREFIX+JwtTokenUtil.getToken(user.getEmail(),user.getNickname(),user.getRole(),user.getId(),1800000);
                        response.setHeader("authorization", accessToken);

                        // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
                		SsafitUserDetails userDetails = new SsafitUserDetails(user);
                        Collection<? extends GrantedAuthority> test = userDetails.getAuthorities();
                        System.out.println(test.stream().toArray().toString());
                		UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(user.getNickname(),null,userDetails.getAuthorities());
//                		jwtAuthentication.setDetails(userDetails);
                		return jwtAuthentication;
                }
            }
            return null;
        }
        // accessToken이 만료시간을 벗어났고, refreshToken이 NULL이 아닐때,
        else if(jwtTokenUtil.validateToken(token) && refreshToken != null) {     // 이것도 범위안에 있으면 false를 반환함.
            // 재발급 후, 컨텍스트에 다시 넣기
            System.out.println("4");
            /// 리프레시 토큰 검증
            boolean validateRefreshToken = jwtTokenUtil.validateToken(refreshToken);  // 범위안에 있으면 false를 반환함.
            /// 리프레시 토큰 저장소 존재유무 확인
            boolean isRefreshToken = jwtTokenUtil.existsRefreshToken(refreshToken);
            // refreshToken이 유효하다면,
            if (!validateRefreshToken && isRefreshToken) {
                System.out.println("6");
                /// 리프레시 토큰으로 이메일 정보 가져오기
                String email = jwtTokenUtil.getUserEmail(refreshToken);
                System.out.println("7");
                /// 이메일로 권한정보 받아오기
                User user = userService.getUserByEmail(email);
                System.out.println("8");
                if(user != null) {
                    // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
                    SsafitUserDetails userDetails = new SsafitUserDetails(user);
                    Collection<? extends GrantedAuthority> test = userDetails.getAuthorities();
                    System.out.println(test.stream().toArray().toString());

                    // response에 accesstoken 추가.
                    String accessToken = JwtTokenUtil.TOKEN_PREFIX+JwtTokenUtil.getToken(user.getEmail(),user.getNickname(),user.getRole(),user.getId(),1800000);
                    response.setHeader("authorization", accessToken);

                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(user.getNickname(),null,userDetails.getAuthorities());
//                		jwtAuthentication.setDetails(userDetails);
                    System.out.println("9");
                    return jwtAuthentication;
                }

            }
        }
        System.out.println("5");
        return null;
    }
}
