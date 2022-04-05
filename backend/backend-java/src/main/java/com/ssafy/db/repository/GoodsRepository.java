package com.ssafy.db.repository;

import com.ssafy.db.entity.cloth.Goods;
import com.ssafy.db.entity.codi.Codi;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoodsRepository extends JpaRepository<Goods, Long> {

    @Query(value = "SELECT EXISTS(SELECT * FROM Goods WHERE GOODS_ID = :GoodsId)", nativeQuery = true)
    int existsByGOODS_ID(Long GoodsId);


    @Query(value = "SELECT * FROM Goods Where GOODS_ID IN (:goodIds)",
            countQuery = "SELECT count(*) FROM Goods Where GOODS_ID IN (:goodIds)"
            , nativeQuery = true)
    List<Goods> findByGOODSList(@Param("goodIds")List<Integer> goodIds, Pageable pageable);

    @Query(value="SELECT * FROM Goods Where GOODS_ID = :goodsId", nativeQuery = true)
    Goods findByGOODSID(long goodsId);
//    Goods Save(Goods goods);

    @Query(value = "SELECT count(*) FROM Goods Where GOODS_ID IN (:goodIds)", nativeQuery = true)
    int findCountByGoods(@Param("goodIds") List<Integer> goodIds);
}
