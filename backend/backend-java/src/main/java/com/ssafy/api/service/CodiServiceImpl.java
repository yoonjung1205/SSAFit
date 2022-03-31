package com.ssafy.api.service;

import com.ssafy.api.request.CodiReq;
import com.ssafy.api.response.CodiListRes;
import com.ssafy.db.entity.codi.Codi;
import com.ssafy.db.entity.codi.LikeCodi;
import com.ssafy.db.entity.codi.UserCodi;
import com.ssafy.db.repository.CodiRepository;
import com.ssafy.db.repository.LikeCodiRepository;
import com.ssafy.db.repository.UserRepository;
import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodiServiceImpl implements CodiService {

    @Autowired
    LikeCodiRepository likeCodiRepository;

    @Autowired
    CodiRepository codiRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public CodiListRes getMyCodiList(int userId) {

        CodiListRes codiListRes = new CodiListRes();

        List<Integer> codiIdList =  likeCodiRepository.findCodiById(userId);
        List<Codi> codiList = codiRepository.findByCodiList(codiIdList);

        codiListRes.setCodiList(codiList);

        return codiListRes;
    }

    @Override
    public void likeCodi(int userId, CodiReq codiReq) {

        //있으면 true
        if(!codiRepository.existsByCODI_ID(codiReq.getCodiId())){
            Codi codi = new Codi();
            codi.setCODI_ID(codiReq.getCodiId());
            codi.setCodiTitle(codiReq.getCodiTitle());
            codi.setCodiImg(codiReq.getCodiImg());
            codi.setTpo(codiReq.getTpo());

            StringBuilder sb = new StringBuilder();
            for(String ht:codiReq.getHashtags()) {
                sb.append(ht);
                sb.append(",");
            }
            String hashtags = sb.substring(0,sb.length()-1);
            codi.setHashtags(hashtags);
            codiRepository.save(codi);
        }

        Codi codi = codiRepository.findByCODI_ID(codiReq.getCodiId());
        User user = userRe
        UserCodi userCodi = new UserCodi();
        userCodi.setCodi(codi);
        userCodi.setUser();
        LikeCodi likeCodi = new LikeCodi();
        likeCodi.setUserCodi();
        likeCodiRepository.saveAndFlush()
    }
}
