package com.ssafy.api.response;

import com.ssafy.common.vo.SearchCloth;
import com.ssafy.mongodb.entity.Cloth;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("GoodsListRes")
@AllArgsConstructor
@NoArgsConstructor
public class GoodsListRes {

    private List<SearchCloth> goodsList;
}
