package com.ssafy.common.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SearchCloth {
    private Number newClothId;

    private Number clothId;

    private String clothName;

    private String brand;

    private String clothImg;

    private Number clothPrice;

    private String colorName;

    private String goodsSize;

    //private String goodsSize;
}
