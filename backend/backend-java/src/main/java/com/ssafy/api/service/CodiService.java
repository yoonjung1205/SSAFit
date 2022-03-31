package com.ssafy.api.service;

import com.ssafy.api.request.CodiReq;
import com.ssafy.api.response.CodiListRes;

public interface CodiService {


    public CodiListRes getMyCodiList(int userId);

    public void likeCodi(Long userId,CodiReq codiReq);
}
