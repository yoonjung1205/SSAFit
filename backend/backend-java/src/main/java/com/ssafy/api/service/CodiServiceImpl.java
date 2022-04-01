package com.ssafy.api.service;

import com.ssafy.api.request.CodiReq;
import com.ssafy.api.response.CodiListRes;
import com.ssafy.common.vo.CodiForm;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.codi.Codi;
import com.ssafy.db.entity.codi.LikeCodi;
import com.ssafy.db.entity.codi.UnlikeCodi;
import com.ssafy.db.entity.codi.UserCodi;
import com.ssafy.db.repository.CodiRepository;
import com.ssafy.db.repository.LikeCodiRepository;
import com.ssafy.db.repository.UnLikeCodiRepository;
import com.ssafy.db.repository.UserRepository;
import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CodiServiceImpl implements CodiService {

    @Autowired
    LikeCodiRepository likeCodiRepository;

    @Autowired
    UnLikeCodiRepository unLikeCodiRepository;

    @Autowired
    CodiRepository codiRepository;

    @Autowired
    UserRepository userRepository;



    @Override
    public CodiListRes getMyCodiList(int userId, Pageable pageable) {

        CodiListRes codiListRes = new CodiListRes();

        List<Integer> codiIdList =  likeCodiRepository.findCodiIDByUserId(userId);
        List<Codi> codiList = codiRepository.findByCodiList(codiIdList,pageable);
        List<CodiForm> codiFormList = new ArrayList<>();
        for(Codi codi : codiList) {
            CodiForm codiForm = new CodiForm();
            codiForm.setCODI_ID(codi.getCODI_ID());
            codiForm.setCodiImg(codi.getCodiImg());
            codiForm.setCodiTitle(codi.getCodiTitle());
            codiForm.setTpo(codi.getTpo());

            String[] list = codi.getHashtags().split(",");
            List<String> slist = Arrays.asList(list);
            codiForm.setHashtags(slist);
            codiFormList.add(codiForm);
        }

        codiListRes.setCodiList(codiFormList);

        return codiListRes;
    }

    @Override
    public void likeCodi(Long userId, CodiReq codiReq) {

        //있으면 true
        if(codiRepository.existsByCODI_ID(codiReq.getCodiId()) == 0){
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


        Codi codi = codiRepository.findByCODIID(codiReq.getCodiId());
        User user = userRepository.findUserById(userId);
        UserCodi userCodi = new UserCodi();
        userCodi.setCodi(codi);
        userCodi.setUser(user);
        LikeCodi likeCodi = new LikeCodi();
        likeCodi.setUserCodi(userCodi);

        if(likeCodiRepository.existsByCodiIDAndUserID(codiReq.getCodiId(),userId) == 1){
            likeCodiRepository.delete(likeCodi);
        }else{
            likeCodiRepository.saveAndFlush(likeCodi);
        }

    }

    @Override
    public void unlikeCodi(Long userId, CodiReq codiReq) {
        //있으면 true
        if(codiRepository.existsByCODI_ID(codiReq.getCodiId()) == 0){
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


        Codi codi = codiRepository.findByCODIID(codiReq.getCodiId());
        User user = userRepository.findUserById(userId);
        UserCodi userCodi = new UserCodi();
        userCodi.setCodi(codi);
        userCodi.setUser(user);
        UnlikeCodi unlikeCodi = new UnlikeCodi();
        unlikeCodi.setUserCodi(userCodi);

        if(likeCodiRepository.existsByCodiIDAndUserID(codiReq.getCodiId(),userId) == 1){
            unLikeCodiRepository.delete(unlikeCodi);
        }else{
            unLikeCodiRepository.saveAndFlush(unlikeCodi);
        }


    }
}
