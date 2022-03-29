package com.ssafy.api.service;

import com.ssafy.api.request.UserChangePutReq;
import com.ssafy.api.request.UserChangePwReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.ValidateEmailReq;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User OAuthcreateUser(UserRegisterPostReq userRegisterInfo, String url);
	User AuthcreateUser(UserRegisterPostReq userRegisterInfo, String url);
	User getUserByEmail(String email);
	User saveUser(User user);
	public boolean verifyEmail(ValidateEmailReq validateEmailReq);
	void setUserPasswordByEmail(String email,String pw);

	User updateUser(UserChangePutReq userChangePutReq,String fileUrl);

	User updateUser(UserChangePutReq userChangePutReq);

	void updateUserPw(UserChangePwReq userChangePwReq);
}
