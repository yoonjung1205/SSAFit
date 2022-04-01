package com.ssafy.common.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CodiForm {

    int CODI_ID;

    String tpo;

    String codiTitle;

    List<String> hashtags;

    String codiImg;
}
