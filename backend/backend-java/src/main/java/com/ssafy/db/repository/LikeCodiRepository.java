package com.ssafy.db.repository;

import com.ssafy.db.entity.cloth.GoodsReview;
import com.ssafy.db.entity.codi.LikeCodi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeCodiRepository  extends JpaRepository<LikeCodi, Long> {


    @Query(value = "select CODI_ID from LikeCodi where USER_ID = :USERID",nativeQuery = true)
    List<Integer> findCodiIDByUserId(int USERID);

    @Query(value =  "SELECT EXISTS(SELECT * FROM LikeCodi WHERE CODI_ID = :codiId AND USER_ID = :userId)", nativeQuery = true)
    int existsByCodiIDAndUserID(int codiId,long userId);
}
