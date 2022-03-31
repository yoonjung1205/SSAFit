package com.ssafy.api.service;

import com.ssafy.api.request.GoodReq;
import com.ssafy.api.request.UserCommentReq;
import com.ssafy.api.response.GoodsListRes;
import com.ssafy.api.response.UserCommentRes;
import com.ssafy.db.entity.User;
import com.ssafy.mongodb.entity.Cloth;

import java.util.List;

public interface GoodsService {

    public void goodInsert(GoodReq goodReq);

    public GoodsListRes goodsListSearchWord(String keywords);

    public UserCommentRes goodsCommentInsert(UserCommentReq userCommentReq);

    public UserCommentRes goodsCommentList(String no);

    public UserCommentRes goodsCommentUpdate(UserCommentReq userCommentReq,int commentSeq);

    public void goodsCommentDelete(long commentSeq);
}
