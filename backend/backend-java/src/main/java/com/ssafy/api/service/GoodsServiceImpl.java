package com.ssafy.api.service;

import com.ssafy.api.request.GoodReq;
import com.ssafy.api.request.UserCommentReq;
import com.ssafy.api.response.GoodsListRes;
import com.ssafy.api.response.UserCommentRes;
import com.ssafy.common.vo.SearchCloth;
import com.ssafy.db.entity.cloth.Goods;
import com.ssafy.db.entity.cloth.GoodsReview;
import com.ssafy.db.repository.GoodsRepository;
import com.ssafy.db.repository.GoodsReviewRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.mongodb.entity.Cloth;
import com.ssafy.mongodb.repository.ClothRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsServiceImpl implements GoodsService {

    @Autowired
    ClothRepository clothRepository;

    @Autowired
    GoodsReviewRepository goodsReviewRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GoodsRepository goodsRepository;

    @Override
    public void goodInsert(GoodReq goodReq) {
        if(goodsRepository.existsByGOODS_ID(goodReq.getClothId()) == 1) {
            System.out.println("존재함");
        }else{
            System.out.println("없음");
            Goods goods = Goods.builder()
                    .id(goodReq.getClothId())
                    .brand(goodReq.getBrand())
                    .name(goodReq.getClothName())
                    .price(goodReq.getClothPrice())
                    .goodsImg(goodReq.getClothImg())
                    .build();
            System.out.println(goods.toString());

//            goodsRepository.SaveAndFlush(goods);

        }



    }

    @Override
    public GoodsListRes goodsListSearchWord(String keywords) {
        GoodsListRes goodsListRes = new GoodsListRes();
        SearchCloth searchCloth = new SearchCloth();
        List<SearchCloth> list = clothRepository.findAllByClothNameRegex(keywords + ".*");
        goodsListRes.setGoodsList(list);
        System.out.println(list.get(0).getClothName());
        System.out.println(list.get(1).getClothName());

        return goodsListRes;
    }

    @Override
    public UserCommentRes goodsCommentInsert(UserCommentReq userCommentReq) {
        GoodsReview goodsReview = new GoodsReview();
        goodsReview.setReviewId(userCommentReq.getReviewId());
        goodsReview.setUser(userRepository.findUserByEmail(userCommentReq.getEmail()));
        goodsReview.setComment(userCommentReq.getContents());
        goodsReviewRepository.saveAndFlush(goodsReview);

        UserCommentRes userCommentRes = new UserCommentRes();
        userCommentRes.setGoodsReviewList(goodsReviewRepository.findByReviewId(userCommentReq.getReviewId()));
        return userCommentRes;
    }

    @Override
    public UserCommentRes goodsCommentList(String no) {

        UserCommentRes userCommentRes = new UserCommentRes();
        userCommentRes.setGoodsReviewList(goodsReviewRepository.findByReviewId(no));
        return userCommentRes;

    }

    @Override
    public UserCommentRes goodsCommentUpdate(UserCommentReq userCommentReq, int commentSeq) {
        goodsReviewRepository.updateComment(userCommentReq.getContents(), commentSeq);

        UserCommentRes userCommentRes = new UserCommentRes();
        userCommentRes.setGoodsReviewList(goodsReviewRepository.findByReviewId(userCommentReq.getReviewId()));
        return userCommentRes;
    }

    @Override
    public void goodsCommentDelete(long commentSeq) {
        goodsReviewRepository.deleteById(commentSeq);

    }
}
