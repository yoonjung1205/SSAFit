package com.ssafy.api.service;

import com.ssafy.api.request.CodiReq;
import com.ssafy.api.response.CodiListRes;
import org.springframework.data.domain.Pageable;

public interface CodiService {


    public CodiListRes getMyCodiList(int userId, Pageable pageable);

    public void likeCodi(Long userId,CodiReq codiReq);

    public void unlikeCodi(Long userId,CodiReq codiReq);
}
