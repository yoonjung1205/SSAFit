package com.ssafy.api.controller;

import com.ssafy.api.request.CodiReq;
import com.ssafy.api.response.CodiListRes;
import com.ssafy.api.service.CodiService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Api(value = "코디 API", tags = {"Codi."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/codi")
public class CodiController {

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    CodiService codiService;

    @GetMapping("/mylist")
    @ApiOperation(value = "내가 좋아요한 codi List가져오기", notes = "내가 좋아요한 codi List가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<CodiListRes> myCodiList(HttpServletRequest request, Pageable pageable) {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        token = token.replace(JwtTokenUtil.TOKEN_PREFIX, "");

        int userId = jwtTokenUtil.getUserId(token);
        System.out.println("userId : " + userId);


        // codiList userid로 codiId List 들고오고
        CodiListRes codiListRes = new CodiListRes();
        codiListRes = codiService.getMyCodiList(userId,pageable);



        return new ResponseEntity<CodiListRes>(codiListRes, HttpStatus.OK);
    }

    @PostMapping("/like")
    @ApiOperation(value = "codi 좋아요 누르기", notes = "codi 좋아요 누르기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> likeCodi(@RequestBody @ApiParam(value="이메일 정보", required = true) CodiReq codiReq, HttpServletRequest request) {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        token = token.replace(JwtTokenUtil.TOKEN_PREFIX, "");

        long userId = jwtTokenUtil.getUserId(token);
        System.out.println("userId : " + userId);

        codiService.likeCodi(userId, codiReq);


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/unlike")
    @ApiOperation(value = "코디 싫어요 누르기.", notes = "코디 싫어요 누르기.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> unlikeCodi(@RequestBody @ApiParam(value="이메일 정보", required = true) CodiReq codiReq, HttpServletRequest request) {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        token = token.replace(JwtTokenUtil.TOKEN_PREFIX, "");

        long userId = jwtTokenUtil.getUserId(token);
        System.out.println("userId : " + userId);

        codiService.unlikeCodi(userId, codiReq);


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
