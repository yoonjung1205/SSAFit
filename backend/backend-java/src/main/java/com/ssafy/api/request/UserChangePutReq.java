package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserChangePutReq")
public class UserChangePutReq {

    @ApiModelProperty(name="유저 이메일", example="@email.com")
    String sub;

    @ApiModelProperty(name="유저 닉네임", example="팡민")
    String nickname;

    @ApiModelProperty(name="키", example="123")
    int height;

    @ApiModelProperty(name="몸무게", example="123")
    int weight;

    @ApiModelProperty(name="성별", example="0")
    int gender;

}
