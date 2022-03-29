package com.ssafy.api.controller;

import com.ssafy.api.request.UserChangePwReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Api(value = "옷 API", tags = {"Cloth."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/goods")
public class GoodsController {

//    @GetMapping("/search")
//    @ApiOperation(value = "옷 정보 검색", notes = "옷 정보를 검색한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<? extends BaseResponseBody> searchGoods(@RequestParam @ApiParam(value="옷 정보 검색 uri 파라미터", required = true) String value, int page, int size) {
//
//
//    }

}
