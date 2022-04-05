package com.ssafy.mongodb.repository;

import com.ssafy.mongodb.entity.UserTop;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserTopRepository extends MongoRepository<UserTop, ObjectId> {

    UserTop findByUserName(String userName);


}
