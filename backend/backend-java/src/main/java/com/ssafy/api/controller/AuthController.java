package com.ssafy.api.controller;

import com.ssafy.api.service.RefreshTokenServiceImpl;
import com.ssafy.common.S3.S3Uploader;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserRefreshToken;
import com.ssafy.db.repository.UserRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

import javax.servlet.http.HttpServletResponse;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	JwtTokenUtil jwtTokenUtil;

	private final UserService userService;

	private final UserRefreshTokenRepository userRefreshTokenRepository;

	@Autowired
	S3Uploader s3Uploader;

	@Autowired
	RefreshTokenServiceImpl refreshTokenService;

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo, HttpServletResponse response) {
		String userEmail = loginInfo.getEmail();
		String password =  loginInfo.getPassword();
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
		User user = userService.getUserByEmail(userEmail);
		// 로그인 요청한 유저로부터 입력된 패스워드와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(bCryptPasswordEncoder.matches(password, user.getPassword())) {

			UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userEmail);
			String url = s3Uploader.getS3(user.getProfileImageUrl());
			String accessToken = JwtTokenUtil.TOKEN_PREFIX+JwtTokenUtil.getAuthToken(userEmail,user.getNickname(),user.getRole(),user.getId(),user.getProfileImageUrl(),user.getHeight(),user.getWeight(),user.getGender().ordinal(),1800000);
			String refreshToken = JwtTokenUtil.getToken(userEmail,user.getNickname(),user.getRole(),user.getId(),172800000);
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
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(UserLoginPostRes.ofs(200, "Success"));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
	}
}
