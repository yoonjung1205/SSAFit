package com.ssafy.oauth.handler;


import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.RefreshTokenServiceImpl;
import com.ssafy.api.service.UserService;
import com.ssafy.common.util.CookieUtil;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserRefreshToken;
import com.ssafy.db.repository.UserRefreshTokenRepository;
import com.ssafy.config.properties.AppProperties;
import com.ssafy.oauth.entity.ProviderType;
import com.ssafy.oauth.entity.RoleType;
import com.ssafy.oauth.info.OAuth2UserInfo;
import com.ssafy.oauth.info.OAuth2UserInfoFactory;
import com.ssafy.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;


@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    @Autowired
    RefreshTokenServiceImpl refreshTokenService;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    private final AppProperties appProperties;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;



    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtil.getCookie(request, OAuth2AuthorizationRequestBasedOnCookieRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

//        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
//            throw new IllegalArgumentException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
//        }
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        ProviderType providerType = ProviderType.valueOf(authToken.getAuthorizedClientRegistrationId().toUpperCase());

        OidcUser user = ((OidcUser) authentication.getPrincipal());
        System.out.println("1111");

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        System.out.println("user : " + userInfo.getEmail());
        Collection<? extends GrantedAuthority> authorities = ((OidcUser) authentication.getPrincipal()).getAuthorities();

        RoleType roleType = hasAuthority(authorities, RoleType.ADMIN.getCode()) ? RoleType.ADMIN : RoleType.USER;

        Date now = new Date();
        String userEmail = userInfo.getEmail();
        System.out.println("userEmail : " + userEmail);
//        User user2 = userService.getUserByEmail(userEmail);
//        if(user2 == null) {
//            User nuser = new User();
//            nuser.setEmail(userEmail);
//            nuser.setName(((OidcUser) authentication.getPrincipal()).getName());
//            userService.saveUser(nuser);
//        }

        // 여기서부터 갈림길.

        User user2 = userService.getUserByEmail(userEmail);
        if(user2 == null) {
            System.out.println("111111111111");
            // 추가정보 기입 시, 필요한 정보만 가지고 redirect로 간다.
            response.setHeader("email", userInfo.getEmail());
            response.setHeader("password", bCryptPasswordEncoder.encode("겟겟인데어"));

            return UriComponentsBuilder.fromUriString(targetUrl).queryParam("email", userInfo.getEmail())
                    .build().toUriString();

            // 회원가입이 된 경우.
        }else {
            System.out.println("222222222222");
            // refreshToken 및 accessToken 발급해서 homepage redirect로 간다.

            // 로그인 요청한 유저로부터 입력된 패스워드와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)


            UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userEmail);

            String accessToken = JwtTokenUtil.TOKEN_PREFIX+JwtTokenUtil.getOAuthToken(userEmail,user2.getNickname(),user2.getRole(),user2.getId(),user2.getProfileImageUrl(),user2.getHeight(),user2.getWeight(),user2.getGender().ordinal(),1800000);
            String refreshToken = JwtTokenUtil.getToken(userEmail,user2.getNickname(),user2.getRole(),user2.getId(),172800000);
            if(userRefreshToken == null || jwtTokenUtil.validateToken(userRefreshToken.getRefreshToken())) {  // 범위안에 있으면 false를 반환함. 범위안에 없으면 true
                System.out.println(userEmail);
                System.out.println(refreshToken);
                UserRefreshToken userRefreshToken2 = new UserRefreshToken(userEmail, refreshToken);
                System.out.println("로그인 : " + userRefreshToken);

                refreshTokenService.deleteAndSave(userRefreshToken,userRefreshToken2);
                response.setHeader("refreshToken", userRefreshToken2.getRefreshToken());
            }else {
                response.setHeader("refreshToken", userRefreshToken.getRefreshToken());
            }

            response.setHeader("authorization",accessToken);




           return UriComponentsBuilder.fromUriString("https://ssafit.site/main")
                    .queryParam("access-token-jwt",accessToken)
                    .queryParam("refresh-token-jwt",refreshToken)
                    .build().toUriString();
        }

//        AuthToken accessToken = tokenProvider.createAuthToken(
//                userInfo.getId(),
//                roleType.getCode(),
//                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
//        );

        // refresh 토큰 설정
//        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
//
//        AuthToken refreshToken = tokenProvider.createAuthToken(
//                appProperties.getAuth().getTokenSecret(),
//                new Date(now.getTime() + refreshTokenExpiry)
//        );

        // DB 저장
//        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userInfo.getId());
//        if (userRefreshToken != null) {
//            userRefreshToken.setRefreshToken(refreshToken.getToken());
//        } else {
//            userRefreshToken = new UserRefreshToken(userInfo.getId(), refreshToken.getToken());
//            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
//        }
//
//        int cookieMaxAge = (int) refreshTokenExpiry / 60;
//
//        CookieUtil.deleteCookie(request, response, authorizationRequestRepository.REFRESH_TOKEN);
//        CookieUtil.addCookie(response, authorizationRequestRepository.REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean hasAuthority(Collection<? extends GrantedAuthority> authorities, String authority) {
        if (authorities == null) {
            return false;
        }

        for (GrantedAuthority grantedAuthority : authorities) {
            if (authority.equals(grantedAuthority.getAuthority())) {
                return true;
            }
        }
        return false;
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return appProperties.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    // Only validate host and port. Let the clients use different paths if they want to
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}
