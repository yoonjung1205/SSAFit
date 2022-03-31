package com.ssafy.db.repository;

import com.ssafy.db.entity.cloth.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GoodsRepository extends JpaRepository<Goods, Long> {

    @Query(value = "SELECT EXISTS(SELECT * FROM Goods WHERE GOODS_ID = :GoodsId)", nativeQuery = true)
    int existsByGOODS_ID(Long GoodsId);

//    Goods Save(Goods goods);

}
