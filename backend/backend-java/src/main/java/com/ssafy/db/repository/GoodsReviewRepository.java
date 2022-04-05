package com.ssafy.db.repository;

import com.ssafy.db.entity.UserRefreshToken;
import com.ssafy.db.entity.cloth.GoodsReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface GoodsReviewRepository  extends JpaRepository<GoodsReview, Long> {


    List<GoodsReview> findByReviewId(String reviewId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE GoodsReview g SET g.comment = :comment WHERE g.id = :id")
    int updateComment(String comment, long id);
}
