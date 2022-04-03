package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.mongodb.entity.Department;
import org.springframework.stereotype.Service;


public interface MongoUserService {

    public void createUser(User user);

    public void updateUser(User user);

}
