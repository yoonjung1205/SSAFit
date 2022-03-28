package com.ssafy.api.service;

import com.ssafy.api.request.ValidateEmailReq;
import com.ssafy.db.entity.Gender;
import com.ssafy.db.entity.User;
import com.ssafy.oauth.entity.ProviderType;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.transaction.annotation.Transactional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	UserRepository userRepository;

	UserRepositorySupport userRepositorySupport;

	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo,String url) {
		User user = new User();
		Gender gender;
		user.setEmail(userRegisterInfo.getEmail());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		System.out.println("createUser : " + url);
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
		user.setProfileImageUrl(url);
		user.setPassword(bCryptPasswordEncoder.encode(userRegisterInfo.getPassword()));
		user.setNickname(userRegisterInfo.getNickname());
		user.setRole("ROLE_USER");

		user.setHeight(userRegisterInfo.getHeight());
		user.setWeight(userRegisterInfo.getWeight());
		user.setProviderType(ProviderType.LOCAL);
		if(userRegisterInfo.getGender() == 0) {
			user.setGender(Gender.FEMALE);
		}else if(userRegisterInfo.getGender() == 1) {
			user.setGender(Gender.MALE);
		}
		user.setBirthDate(userRegisterInfo.getBirth());
		return userRepository.saveAndFlush(user);
	}



	@Override
	public User getUserByEmail(String email) {

		User user = userRepository.findUserByEmail(email);
		return user;
	}

	@Override
	public User saveUser(User user) {
		User userEntity = userRepository.save(user);
		return userEntity;
	}

	@Override
	public boolean verifyEmail(ValidateEmailReq validateEmailReq) {

		if (! userRepository.existsByEmail(validateEmailReq.getEmail())) {
			return true;
		}

		return false;
	}

	@Override
	@Transactional
	public void setUserPasswordByEmail(String email, String pw) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
		userRepository.updatePassword(email,bCryptPasswordEncoder.encode(pw));


	}
}
