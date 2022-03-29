package com.ssafy.db.repository;

import com.ssafy.db.entity.Gender;
import com.ssafy.db.entity.User;
import org.hibernate.sql.Insert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.


    User saveAndFlush(User user);

    User findUserById(Long id);


    User findUserByEmail(String email);


    // 정보를 들고오는게 아닌 유무만 확인
    boolean existsByEmail(String email);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE User b SET b.nickname= :nickname, b.height= :height, b.weight= :weight, b.gender= :gender, b.profileImageUrl= :fileUrl where b.email= :email")
    int updateUser(String nickname, int height, int weight, Gender gender,String fileUrl, String email);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE User b SET b.nickname= :nickname, b.height= :height, b.weight= :weight, b.gender= :gender where b.email= :email")
    int updateUser(String nickname, int height, int weight, Gender gender, String email);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE User b SET b.password= :password where b.email= :email")
    int updatePassword(String email, String password);
}