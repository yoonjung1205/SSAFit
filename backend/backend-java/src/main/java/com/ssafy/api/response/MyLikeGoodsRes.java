package com.ssafy.api.response;

import com.ssafy.common.vo.CodiForm;
import com.ssafy.db.entity.cloth.Goods;
import lombok.Data;

import java.util.List;

@Data
public class MyLikeGoodsRes {
    private List<Goods> goodsList;

    private int pageNumber;

    private int total;
}
