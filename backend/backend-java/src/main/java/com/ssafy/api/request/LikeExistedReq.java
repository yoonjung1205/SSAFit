package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CommentsExistedReq")
public class LikeExistedReq {

    @ApiModelProperty(name="유저 아이디", example="123")
    int userId;

    @ApiModelProperty(name="옷 아이디", example="0")
    int clothId;
}
