package com.ssafy.db.repository;

import com.ssafy.db.entity.cloth.Goods;
import com.ssafy.db.entity.cloth.GoodsReview;
import com.ssafy.db.entity.codi.Codi;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodiRepository  extends JpaRepository<Codi, Long> {

    @Query("SELECT * FROM Codi Where CODI_ID IN (:codiIds)")
    List<Codi> findByCodiList(@Param("codiIds")List<Integer> codiIds);


    boolean existsByCODI_ID(int codi_id);

    Codi findByCODI_ID(int codi_id);
}
