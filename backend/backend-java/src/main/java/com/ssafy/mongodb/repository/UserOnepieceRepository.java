package com.ssafy.mongodb.repository;

import com.ssafy.mongodb.entity.UserOnepiece;
import com.ssafy.mongodb.entity.UserOuter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserOnepieceRepository extends MongoRepository<UserOnepiece, ObjectId> {

    public UserOnepiece findByUserName(String userName);
}
