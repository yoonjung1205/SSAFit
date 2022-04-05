package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CommentsExistedRes")
public class LikeExistedRes {

    @ApiModelProperty(name="좋아요 여부", example="True/false")
    boolean isLike;

}
