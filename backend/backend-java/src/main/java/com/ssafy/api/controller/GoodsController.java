package com.ssafy.api.controller;

import com.ssafy.api.request.GoodReq;
import com.ssafy.api.request.UserChangePwReq;
import com.ssafy.api.request.UserCommentReq;
import com.ssafy.api.response.GoodsListRes;
import com.ssafy.api.response.UserCommentRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.GoodsService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import com.ssafy.mongodb.entity.Cloth;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Api(value = "옷 API", tags = {"Cloth."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/goods")
public class GoodsController {

    @Autowired
    GoodsService goodsService;

    @Autowired
    JwtTokenUtil jwtTokenUtil;


    @PostMapping("/like")
    public void likeGood(@RequestBody @ApiParam(value="좋아요 등록", required = true) GoodReq goodReq, HttpServletRequest request){
//        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
//        token = token.replace(JwtTokenUtil.TOKEN_PREFIX, "");
//
//        int userId = jwtTokenUtil.getUserId(token);
//        System.out.println("userId : " + userId);

        // 옷정보 저장 service

        // like 등록, service
        System.out.print(goodReq.getClothId());
        goodsService.goodInsert(goodReq);

    }

    @GetMapping("/search")
    @ApiOperation(value = "옷 정보 검색", notes = "옷 정보를 검색한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<GoodsListRes> searchGoods(@RequestParam @ApiParam(value="옷 정보 검색 uri 파라미터", required = true) String keyword) {

        GoodsListRes goodsListRes;
        System.out.println(keyword);
        goodsListRes = goodsService.goodsListSearchWord(keyword);

        return new ResponseEntity<GoodsListRes>(goodsListRes, HttpStatus.OK);
    }

    @PostMapping(value="/comments")
    @ApiOperation(value = "댓글 입력", notes = "댓글을 insert 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserCommentRes> goodsCommentInsert(
            UserCommentReq userCommentReq) {

        UserCommentRes userCommentRes;
        userCommentRes = goodsService.goodsCommentInsert(userCommentReq);


        return new ResponseEntity<UserCommentRes>(userCommentRes, HttpStatus.OK);

    }

    @GetMapping(value="/houses/comments/{no}")
    @ApiOperation(value = "댓글 리스트 출력", notes = "해당 리뷰의 댓글 리스트를 전달한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserCommentRes> goodsCommentList(
            @PathVariable String no) {

//			houseCommentDto.setUserId( ((UserDto) session.getAttribute("userDto")).getUserSeq());
//			houseCommentDto.setUserName( ((UserDto) session.getAttribute("userDto")).getUserName());
        UserCommentRes userCommentRes;

        userCommentRes = goodsService.goodsCommentList(no);

        return new ResponseEntity<UserCommentRes>(userCommentRes, HttpStatus.OK);
    }

    @PutMapping(value="/houses/comments/{commentSeq}")
    @ApiOperation(value = "댓글 업데이트", notes = "해당 리뷰의 댓글을 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserCommentRes> goodsCommentUpdate(
            @PathVariable int commentSeq,
            UserCommentReq userCommentReq) {

        UserCommentRes userCommentRes;
        userCommentRes = goodsService.goodsCommentUpdate(userCommentReq,commentSeq);

        return new ResponseEntity<UserCommentRes>(userCommentRes, HttpStatus.OK);
    }

    @DeleteMapping(value="/houses/comments/{commentSeq}")
    @ApiOperation(value = "댓글 삭제", notes = "해당 리뷰의 댓글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> goodsCommentDelete(
            @PathVariable long commentSeq) {

        goodsService.goodsCommentDelete(commentSeq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
