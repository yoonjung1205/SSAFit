package com.ssafy.api.response;

import lombok.Data;

@Data
public class LikeGoodsRes {
    String brand;
    String clothName;
    int clothPrice;
    String clothImg;
    long newClothId;
    boolean like;
}
