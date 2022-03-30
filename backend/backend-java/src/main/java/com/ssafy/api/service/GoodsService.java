package com.ssafy.api.service;

import com.ssafy.api.response.GoodsListRes;
import com.ssafy.mongodb.entity.Cloth;

import java.util.List;

public interface GoodsService {

    public GoodsListRes goodsListSearchWord(String keywords);
}
