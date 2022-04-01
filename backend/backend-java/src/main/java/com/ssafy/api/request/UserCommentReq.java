package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserCommentReq")
public class UserCommentReq {

    @ApiModelProperty(name="email", example="62415b00021b5aeeacad0fed")
    String email;

    @ApiModelProperty(name="reviewId", example="62415b00021b5aeeacad0fed")
    String reviewId;

    @ApiModelProperty(name="contents", example="옷핏이 좋아요.")
    String contents;

}
