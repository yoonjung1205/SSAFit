package com.ssafy.api.service;

import com.nimbusds.oauth2.sdk.token.RefreshToken;
import com.ssafy.db.entity.UserRefreshToken;
import com.ssafy.db.repository.UserRefreshTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;

@Service
public class RefreshTokenServiceImpl {
    @Autowired
    private UserRefreshTokenRepository refreshTokenRepository;

    @Autowired
    EntityManager entityManager;

    @Transactional
    public void deleteAndSave(UserRefreshToken token, UserRefreshToken token2) {

        // token이 null 이면 저장만함.
        if(token == null) {
            refreshTokenRepository.saveAndFlush(token2);
        }else{
            refreshTokenRepository.delete(token);
            entityManager.flush();
            refreshTokenRepository.saveAndFlush(token2);
        }

    }
//
//    @Transactional
//    public int deleteByUserId(Long userId) {
//        return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
//    }
}
