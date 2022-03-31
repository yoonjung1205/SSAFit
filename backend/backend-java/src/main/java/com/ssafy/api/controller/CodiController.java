package com.ssafy.api.controller;

import com.ssafy.api.response.GoodsListRes;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Api(value = "코디 API", tags = {"Codi."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/codi")
public class CodiController {

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @GetMapping("/mylist")
    @ApiOperation(value = "내가 좋아요한 codi List가져오기", notes = "내가 좋아요한 codi List가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> myCodiList(HttpServletRequest request) {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        token = token.replace(JwtTokenUtil.TOKEN_PREFIX, "");

        int userId = jwtTokenUtil.getUserId(token);
        System.out.println("userId : " + userId);




        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}
