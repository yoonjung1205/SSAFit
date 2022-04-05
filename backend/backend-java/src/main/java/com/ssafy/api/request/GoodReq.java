package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("GoodLikeRequest")
public class GoodReq {

//    int userId;
    @ApiModelProperty(name="옷 ID", example="FastAPI에서 받은 newClothId 보내주시면 됩니다 ")
    Long newClothId;
    @ApiModelProperty(name="옷 Brand", example="옷의 Brand 이름")
    String brand;
    @ApiModelProperty(name="옷 clothName", example="옷의 clothName")
    String clothName;
    @ApiModelProperty(name="옷 clothPrice", example="옷의 clothPrice")
    Long clothPrice;
    @ApiModelProperty(name="옷 clothImg", example="옷의 clothImg")
    String clothImg;
}

