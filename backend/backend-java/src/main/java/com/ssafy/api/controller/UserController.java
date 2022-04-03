package com.ssafy.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.api.request.UserChangePutReq;
import com.ssafy.api.request.UserChangePwReq;
import com.ssafy.api.request.ValidateEmailReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.MongoUserService;
import com.ssafy.api.service.RefreshTokenServiceImpl;
import com.ssafy.common.S3.S3Uploader;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserRefreshToken;
import com.ssafy.db.repository.UserRefreshTokenRepository;
import com.ssafy.oauth.exception.OAuthProviderMissMatchException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafitUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {

	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	UserService userService;

	@Autowired
	private JavaMailSender mailSender;

	private final UserRefreshTokenRepository userRefreshTokenRepository;

	@Autowired
	S3Uploader s3Uploader;

	@Autowired
	RefreshTokenServiceImpl refreshTokenService;

	@Autowired
	MongoUserService mongoUserService;

	@PostMapping("/signup")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> register(
			@ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo, HttpServletResponse response, MultipartHttpServletRequest request) throws IOException {

		MultipartFile file = request.getFile("profileImage");


		String fileUrl = "";
		if(file == null) {
			System.out.println("파일이름이 엄서용~!");
		}else{
			fileUrl = s3Uploader.upload(file,"user");
		}


		System.out.println("fileUrl : " + fileUrl);
		System.out.println("fileUrl : " + fileUrl);

		// oauth 로그인 시.
		if(registerInfo.getPassword() == null) {
			//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
			User u = userService.OAuthcreateUser(registerInfo,fileUrl);

			String userEmail = registerInfo.getEmail();

			User user = userService.getUserByEmail(userEmail);

			// MongoDB에 저장.
			mongoUserService.createUser(user);

			UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userEmail);

			String accessToken = JwtTokenUtil.TOKEN_PREFIX+JwtTokenUtil.getOAuthToken(userEmail,user.getNickname(),user.getRole(),user.getId(),user.getProfileImageUrl(),user.getHeight(),user.getWeight(),user.getGender().ordinal(),1800000);
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


		}else {  // 일반 로그인 시.
			//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
			User u = userService.AuthcreateUser(registerInfo,fileUrl);

			String userEmail = registerInfo.getEmail();

			User user = userService.getUserByEmail(userEmail);

			// MongoDB에 저장.
			mongoUserService.createUser(user);

			UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userEmail);

			String accessToken = JwtTokenUtil.TOKEN_PREFIX+JwtTokenUtil.getToken(userEmail,user.getNickname(),user.getRole(),user.getId(),user.getProfileImageUrl(),user.getHeight(),user.getWeight(),user.getGender().ordinal(),1800000);
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

		// oauth 패스워드 없이 저한테 주시고, 제가 랜덤값을 password에 넣어놓을게요

		// oauth 형한테 jwt안에 oauth인지 아닌지 정보를 담아서 드릴께요.

		// 형이 받아서 oauth 유무 판별하면 되지 않을까.





	}


	@PostMapping("/pw/find")
	@ApiOperation(value = "회원 비밀번호 찾기", notes = "회원 본인의 비밀번호를 찾는다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> findUserPassword(@RequestBody @ApiParam(value="비밀번호 찾기 정보", required = true) ValidateEmailReq validateEmailReq) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		// 랜덤 비밀번호 생성
		String newpw = RandomStringUtils.randomAlphabetic(10);
		System.out.println(newpw);

		// 비밀번호 변경
		userService.setUserPasswordByEmail(validateEmailReq.getEmail(),newpw);

		// 변경된 비밀번호 이메일로 쏴주기
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(validateEmailReq.getEmail());
		System.out.println("메일 전송!");
		message.setSubject("[Ssafit] 새 비밀번호가 발급되었습니다.");

		message.setText("회원님의 새 비밀번호는 "+ newpw + " 입니다. 이용해주셔서 감사합니다.");
		mailSender.send(message);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	//이메일 중복검사
	@PostMapping("/email/confirms")
	@ApiOperation(value = "이메일 중복 확인", notes = "이메일 중복을 확인한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> emailVerification(@RequestBody @ApiParam(value="이메일 정보", required = true) ValidateEmailReq validateEmailReq) throws NoSuchAlgorithmException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException {
		if(userService.verifyEmail(validateEmailReq)) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}
		return ResponseEntity.status(400).body(BaseResponseBody.of(400, "failed"));
	}

	//유저 정보 변경
	@PutMapping("/user")
	@ApiOperation(value = "사용자 정보 변경", notes = "사용자 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> changeUserInfo(@ApiParam(value="사용자 변경 정보", required = true) UserChangePutReq userChangePutReq, HttpServletResponse response, MultipartHttpServletRequest request) throws IOException {

		MultipartFile file = request.getFile("profileImage");
		System.out.println("회원정보 변경 : " + userChangePutReq.getSub());

		String fileUrl = "";
		String accessToken = "";
		if(file == null) {
			System.out.println("파일이름이 엄서용~!");
			User user = userService.updateUser(userChangePutReq);
			mongoUserService.updateUser(user);
			accessToken = JwtTokenUtil.TOKEN_PREFIX+JwtTokenUtil.getToken(user.getEmail(),user.getNickname(),user.getRole(),user.getId(),user.getProfileImageUrl(),user.getHeight(),user.getWeight(),user.getGender().ordinal(),1800000);
		}else{
			fileUrl = s3Uploader.upload(file,"user");
			User user = userService.updateUser(userChangePutReq,fileUrl);
			mongoUserService.updateUser(user);
			accessToken = JwtTokenUtil.TOKEN_PREFIX+JwtTokenUtil.getToken(user.getEmail(),user.getNickname(),user.getRole(),user.getId(),user.getProfileImageUrl(),user.getHeight(),user.getWeight(),user.getGender().ordinal(),1800000);
		}


		response.setHeader("authorization",accessToken);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

	}

	//유저 비밀번호 변경
	@PutMapping("/user/pw")
	@ApiOperation(value = "사용자 비밀번호 변경", notes = "사용자 비밀번호를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> changeUserPw(@RequestBody @ApiParam(value="사용자 비밀번호 정보", required = true) UserChangePwReq userChangePwReq) throws NoSuchAlgorithmException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException {

		userService.updateUserPw(userChangePwReq);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

	}

	//유저 비밀번호 확인
	@PostMapping("/user/pw")
	@ApiOperation(value = "사용자 비밀번호 확인", notes = "사용자 비밀번호를 확인한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> confirmUserPw(@RequestBody @ApiParam(value="사용자 비밀번호 정보", required = true) UserChangePwReq userChangePwReq) {

		String userEmail = userChangePwReq.getEmail();
		String password =  userChangePwReq.getPassword();
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
		User user = userService.getUserByEmail(userEmail);
		// 로그인 요청한 유저로부터 입력된 패스워드와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(bCryptPasswordEncoder.matches(password, user.getPassword())) {
			return ResponseEntity.ok(UserLoginPostRes.ofs(200, "Success"));
		}
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
	}
}
