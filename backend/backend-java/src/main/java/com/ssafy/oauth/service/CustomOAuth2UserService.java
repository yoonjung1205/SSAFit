package com.ssafy.oauth.service;


import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.oauth.entity.ProviderType;
import com.ssafy.oauth.entity.RoleType;
import com.ssafy.oauth.entity.UserPrincipal;
import com.ssafy.oauth.exception.OAuthProviderMissMatchException;
import com.ssafy.oauth.info.OAuth2UserInfo;
import com.ssafy.oauth.info.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());

        User savedUser = userRepository.findUserByEmail(userInfo.getEmail());
        System.out.println(userInfo.getImageUrl());

        System.out.println(savedUser);
        if (savedUser != null) {
            System.out.println("providerType : " + providerType);
            System.out.println("디비 providerType" +savedUser.getProviderType());
//            if (providerType != savedUser.getProviderType()) {
//                throw new OAuthProviderMissMatchException(
//                        "Looks like you're signed up with " + providerType +
//                        " account. Please use your " + savedUser.getProviderType() + " account to login."
//                );
//            }
            updateUser(savedUser, userInfo);
        } else {
            savedUser = createUser(userInfo, providerType);
        }

        return UserPrincipal.create(savedUser, user.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        LocalDateTime now = LocalDateTime.now();

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);

        User user = new User(
                userInfo.getName(),
                userInfo.getEmail(),
                userInfo.getImageUrl(),
                providerType,
                RoleType.USER
        );
        user.setPassword(bCryptPasswordEncoder.encode("겟겟인데어"));
        return user;
        //return userRepository.saveAndFlush(user);
    }

    private User updateUser(User user, OAuth2UserInfo userInfo) {
        if (userInfo.getName() != null && !user.getNickname().equals(userInfo.getName())) {
            user.setNickname(userInfo.getName());
        }

//        if (userInfo.getImageUrl() != null && !user.get.equals(userInfo.getImageUrl())) {
//            user.setProfileImageUrl(userInfo.getImageUrl());
//        }

        return user;
    }
}
