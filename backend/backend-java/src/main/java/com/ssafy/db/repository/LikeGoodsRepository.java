package com.ssafy.db.repository;

import com.ssafy.db.entity.cloth.LikeGoods;
import com.ssafy.db.entity.codi.LikeCodi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeGoodsRepository  extends JpaRepository<LikeGoods, Long> {
    @Query(value = "select GOODS_ID from LikeGoods where USER_ID = :USERID",nativeQuery = true)
    List<Integer> findGoodsIDByUserId(int USERID);

    @Query(value =  "SELECT EXISTS(SELECT * FROM LikeGoods WHERE GOODS_ID = :goodsId AND USER_ID = :userId)", nativeQuery = true)
    int existsByGoodsIDAndUserID(long goodsId,long userId);


}
