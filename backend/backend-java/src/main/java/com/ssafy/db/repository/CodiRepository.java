package com.ssafy.db.repository;

import com.ssafy.db.entity.cloth.Goods;
import com.ssafy.db.entity.cloth.GoodsReview;
import com.ssafy.db.entity.codi.Codi;
import io.swagger.models.auth.In;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodiRepository  extends JpaRepository<Codi, Long> {

    @Query(value = "SELECT * FROM Codi Where CODI_ID IN (:codiIds)",
            countQuery = "SELECT count(*) FROM Codi Where CODI_ID IN (:codiIds)"
            ,nativeQuery = true)

    List<Codi> findByCodiList(@Param("codiIds")List<Integer> codiIds, Pageable pageable);

    @Query(value = "SELECT EXISTS(SELECT * FROM Codi WHERE CODI_ID = :CodiId)", nativeQuery = true)
    int existsByCODI_ID(int CodiId);

    @Query(value="SELECT * FROM Codi Where CODI_ID = :CodiId", nativeQuery = true)
    Codi findByCODIID(int CodiId);

    @Query(value = "SELECT count(*) FROM Codi Where CODI_ID IN (:codiIds)", nativeQuery = true)
    int findCountByCodi(@Param("codiIds") List<Integer> codiIds);

}
