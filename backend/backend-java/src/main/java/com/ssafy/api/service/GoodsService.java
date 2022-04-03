package com.ssafy.api.service;

import com.ssafy.api.request.GoodReq;
import com.ssafy.api.request.UserCommentReq;
import com.ssafy.api.response.*;
import org.springframework.data.domain.Pageable;

public interface GoodsService {



    public GoodsListRes goodsListSearchWord(String keywords);

    public UserCommentRes goodsCommentInsert(UserCommentReq userCommentReq);

    public UserCommentRes goodsCommentList(String no);

    public UserCommentRes goodsCommentUpdate(UserCommentReq userCommentReq,long commentSeq);

    public void goodsCommentDelete(int commentSeq);

    public MyLikeGoodsRes getMyGoodsList(int userId, Pageable pageable);

    public void likeGoods(Long userId, GoodReq goodReq);

    public LikeExistedRes isLikeGoods(int userId, long clothId);
}
