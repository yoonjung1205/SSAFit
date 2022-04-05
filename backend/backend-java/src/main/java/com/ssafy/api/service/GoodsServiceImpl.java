package com.ssafy.api.service;

import com.ssafy.api.request.GoodReq;
import com.ssafy.api.request.UserCommentReq;
import com.ssafy.api.response.*;
import com.ssafy.common.vo.SearchCloth;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.cloth.Goods;
import com.ssafy.db.entity.cloth.GoodsReview;
import com.ssafy.db.entity.cloth.LikeGoods;
import com.ssafy.db.entity.cloth.UserGoods;
import com.ssafy.db.repository.GoodsRepository;
import com.ssafy.db.repository.GoodsReviewRepository;
import com.ssafy.db.repository.LikeGoodsRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.mongodb.repository.ClothRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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

    @Autowired
    LikeGoodsRepository likeGoodsRepository;

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
    public UserCommentRes goodsCommentUpdate(UserCommentReq userCommentReq, long commentSeq) {
        System.out.println(userCommentReq.getContents());
        goodsReviewRepository.updateComment(userCommentReq.getContents(), commentSeq);

        UserCommentRes userCommentRes = new UserCommentRes();
        userCommentRes.setGoodsReviewList(goodsReviewRepository.findByReviewId(userCommentReq.getReviewId()));
        return userCommentRes;
    }

    @Override
    public void goodsCommentDelete(int commentSeq) {
        goodsReviewRepository.deleteById((long) commentSeq);

    }

    @Override
    public MyLikeGoodsRes getMyGoodsList(int userId, Pageable pageable) {

        MyLikeGoodsRes goodsListRes = new MyLikeGoodsRes();

        List<Integer> goodsIdList =  likeGoodsRepository.findGoodsIDByUserId(userId);
        List<Goods> goodsList = goodsRepository.findByGOODSList(goodsIdList, pageable);

        goodsListRes.setGoodsList(goodsList);
        goodsListRes.setPageNumber(pageable.getPageNumber());
        goodsListRes.setTotal(goodsIdList.size());

        return goodsListRes;
    }

    @Override
    public void likeGoods(Long userId, GoodReq goodReq) {

        //있으면 true
        if(goodsRepository.existsByGOODS_ID(goodReq.getNewClothId()) == 0){
            Goods goods = new Goods();
            goods.setNewClothId(goodReq.getNewClothId());
            goods.setClothImg(goodReq.getClothImg());
            goods.setBrand(goodReq.getBrand());
            goods.setClothName(goodReq.getClothName());
            goods.setClothPrice(goodReq.getClothPrice());
            goods.setLikes(true);
            goodsRepository.save(goods);
        }


        Goods goods = goodsRepository.findByGOODSID(goodReq.getNewClothId());
        User user = userRepository.findUserById(userId);
        UserGoods userGoods = new UserGoods();
        userGoods.setGoods(goods);
        userGoods.setUser(user);
        LikeGoods likeGoods = new LikeGoods();
        likeGoods.setUserGoods(userGoods);

        if(likeGoodsRepository.existsByGoodsIDAndUserID(goodReq.getNewClothId(),userId) == 1){
            likeGoodsRepository.delete(likeGoods);
        }else{
            likeGoodsRepository.saveAndFlush(likeGoods);
        }

    }

    @Override
    public LikeExistedRes isLikeGoods(int userId, long clothId) {
        LikeExistedRes commentsExistedRes = new LikeExistedRes();

        if(likeGoodsRepository.existsByGoodsIDAndUserID(clothId,userId) == 1){
            commentsExistedRes.setLike(true);
        }else{
            commentsExistedRes.setLike(false);
        }

        return commentsExistedRes;
    }
}
