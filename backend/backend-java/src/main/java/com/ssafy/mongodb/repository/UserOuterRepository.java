package com.ssafy.mongodb.repository;


import com.ssafy.mongodb.entity.UserOuter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserOuterRepository  extends MongoRepository<UserOuter, ObjectId> {
}
