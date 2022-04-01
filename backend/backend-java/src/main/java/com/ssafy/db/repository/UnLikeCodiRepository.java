package com.ssafy.db.repository;

import com.ssafy.db.entity.codi.LikeCodi;
import com.ssafy.db.entity.codi.UnlikeCodi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UnLikeCodiRepository extends JpaRepository<UnlikeCodi, Long> {

    @Query(value = "select CODI_ID from UnlikeCodi where USER_ID = :USERID",nativeQuery = true)
    List<Integer> findCodiIDByUserId(int USERID);

    @Query(value =  "SELECT EXISTS(SELECT * FROM UnlikeCodi WHERE CODI_ID = :codiId AND USER_ID = :userId)", nativeQuery = true)
    int existsByCodiIDAndUserID(int codiId,long userId);
}
