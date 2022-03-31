package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("CodiReq")
@AllArgsConstructor
@NoArgsConstructor
public class CodiReq {

    @ApiModelProperty(name="옷 ID", example="FastAPI에서 받은 newClothId 보내주시면 됩니다 ")
    int codiId;
    @ApiModelProperty(name="옷 clothPrice", example="옷의 clothPrice")
    String codiTitle;
    @ApiModelProperty(name="옷 Brand", example="옷의 Brand 이름")
    String tpo;
    @ApiModelProperty(name="코디 hashtags", example="["+"체크"+","+"얼죽코"+" ] ")
    List<String> hashtags;

    @ApiModelProperty(name="옷 clothImg", example="옷의 clothImg")
    String codiImg;
}
