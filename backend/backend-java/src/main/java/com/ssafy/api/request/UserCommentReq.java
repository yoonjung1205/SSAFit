package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserCommentReq")
public class UserCommentReq {

    @ApiModelProperty(name="유저 이메일", example="62415b00021b5aeeacad0fed")
    String email;

    @ApiModelProperty(name="리뷰 아이디", example="62415b00021b5aeeacad0fed")
    String reviewId;

    @ApiModelProperty(name="내용", example="옷핏이 좋아요.")
    String contents;

}
