package com.ssafy.api.response;

import com.ssafy.common.vo.CodiForm;
import com.ssafy.common.vo.SearchCloth;
import com.ssafy.db.entity.codi.Codi;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("CodiListRes")
@AllArgsConstructor
@NoArgsConstructor
public class CodiListRes {

    private List<CodiForm> codiList;
}
