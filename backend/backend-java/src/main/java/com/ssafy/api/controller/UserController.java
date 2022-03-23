package com.ssafy.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.api.request.ValidateEmailReq;
import com.ssafy.db.entity.User;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafitUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api_be/auth")
public class UserController {
	
	@Autowired
	UserService userService;

	@Autowired
	private JavaMailSender mailSender;

	@PostMapping("/signup")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}


	@GetMapping("/pw/find")
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
		message.setSubject("[수화닥터] 새 비밀번호가 발급되었습니다.");

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
	public ResponseEntity<? extends BaseResponseBody> EmailVerification(@RequestBody @ApiParam(value="이메일 정보", required = true) ValidateEmailReq validateEmailReq) throws NoSuchAlgorithmException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException {
		if(userService.verifyEmail(validateEmailReq)) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}
		return ResponseEntity.status(400).body(BaseResponseBody.of(400, "failed"));
	}

}
