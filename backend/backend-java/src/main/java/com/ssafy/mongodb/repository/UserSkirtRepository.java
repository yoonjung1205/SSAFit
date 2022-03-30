package com.ssafy.mongodb.repository;

import com.ssafy.mongodb.entity.UserPants;
import com.ssafy.mongodb.entity.UserSkirt;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserSkirtRepository extends MongoRepository<UserSkirt, ObjectId> {
}
