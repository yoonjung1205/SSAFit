package com.ssafy.db.repository;

import com.ssafy.db.entity.cloth.GoodsReview;
import com.ssafy.db.entity.codi.LikeCodi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeCodiRepository  extends JpaRepository<LikeCodi, Long> {

    @Query("select CODI_ID from LikeCodi where user_id = :userId")
    List<Integer> findCodiById(int userId);

}
