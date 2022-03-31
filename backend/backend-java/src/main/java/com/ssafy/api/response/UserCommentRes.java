package com.ssafy.api.response;

import com.ssafy.db.entity.cloth.GoodsReview;
import com.ssafy.mongodb.entity.Cloth;
import lombok.Data;

import java.util.List;

@Data
public class UserCommentRes {

    private List<GoodsReview> goodsReviewList;
}
