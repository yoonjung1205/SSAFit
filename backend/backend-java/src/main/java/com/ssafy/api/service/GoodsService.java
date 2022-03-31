package com.ssafy.api.service;

import com.ssafy.api.request.CodiReq;
import com.ssafy.api.request.GoodReq;
import com.ssafy.api.request.UserCommentReq;
import com.ssafy.api.response.CodiListRes;
import com.ssafy.api.response.GoodsListRes;
import com.ssafy.api.response.MyLikeGoodsRes;
import com.ssafy.api.response.UserCommentRes;
import com.ssafy.db.entity.User;
import com.ssafy.mongodb.entity.Cloth;

import java.util.List;

public interface GoodsService {



    public GoodsListRes goodsListSearchWord(String keywords);

    public UserCommentRes goodsCommentInsert(UserCommentReq userCommentReq);

    public UserCommentRes goodsCommentList(String no);

    public UserCommentRes goodsCommentUpdate(UserCommentReq userCommentReq,int commentSeq);

    public void goodsCommentDelete(long commentSeq);

    public MyLikeGoodsRes getMyGoodsList(int userId);

    public void likeGoods(Long userId, GoodReq goodReq);
}
