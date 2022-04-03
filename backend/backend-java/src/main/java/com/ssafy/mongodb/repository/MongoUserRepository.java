package com.ssafy.mongodb.repository;

import com.ssafy.mongodb.entity.MongoUser;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MongoUserRepository extends MongoRepository<MongoUser, ObjectId> {

    public List<MongoUser> findByUserId(long userId);
}
