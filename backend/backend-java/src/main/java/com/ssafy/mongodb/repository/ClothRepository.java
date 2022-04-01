package com.ssafy.mongodb.repository;

import com.ssafy.common.vo.SearchCloth;
import com.ssafy.mongodb.entity.Cloth;
import com.ssafy.mongodb.entity.Department;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ClothRepository  extends MongoRepository<Cloth, ObjectId> {


    List<SearchCloth> findAllByClothNameRegex(String keywords);
}
