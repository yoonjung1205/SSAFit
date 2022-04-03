package com.ssafy.mongodb.repository;

import com.ssafy.mongodb.entity.UserTop;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserTopRepository extends MongoRepository<UserTop, ObjectId> {

    public UserTop findByUserName(String userName);
}
