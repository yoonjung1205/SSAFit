package com.ssafy.mongodb.repository;


import com.ssafy.mongodb.entity.UserOuter;
import com.ssafy.mongodb.entity.UserPants;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserOuterRepository  extends MongoRepository<UserOuter, ObjectId> {

    public UserOuter findByUserName(String userName);
}
