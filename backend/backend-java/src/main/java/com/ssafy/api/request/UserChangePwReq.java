package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserChangePwReq")
public class UserChangePwReq {

    @ApiModelProperty(name="유저 이메일", example="@email.com")
    String email;

    @ApiModelProperty(name="유저 Password", example="your_password")
    String password;
}
