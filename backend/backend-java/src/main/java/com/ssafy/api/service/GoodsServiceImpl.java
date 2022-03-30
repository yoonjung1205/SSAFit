package com.ssafy.api.service;

import com.ssafy.api.response.GoodsListRes;
import com.ssafy.mongodb.entity.Cloth;
import com.ssafy.mongodb.repository.ClothRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsServiceImpl implements GoodsService {

    @Autowired
    ClothRepository clothRepository;

    @Override
    public GoodsListRes goodsListSearchWord(String keywords) {
        GoodsListRes goodsListRes = new GoodsListRes();

        List<Cloth> list = clothRepository.findAllByClothNameRegex(keywords + ".*");
        goodsListRes.setGoodsList(list);
        System.out.println(list.get(0).getClothName());
        System.out.println(list.get(1).getClothName());

        return goodsListRes;
    }
}
