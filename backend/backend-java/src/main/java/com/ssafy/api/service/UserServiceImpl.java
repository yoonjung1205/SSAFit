package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	UserRepository userRepository;

	UserRepositorySupport userRepositorySupport;

	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setEmail(userRegisterInfo.getEmail());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
		user.setPassword(bCryptPasswordEncoder.encode(userRegisterInfo.getUserPassword()));
		user.setNickname(userRegisterInfo.getNickName());
		user.setRole("ROLE_USER");
		return userRepository.save(user);
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


}
