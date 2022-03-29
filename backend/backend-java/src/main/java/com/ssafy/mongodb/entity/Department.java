package com.ssafy.mongodb.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@Document("user_test")
public class Department {


    @Id
    private ObjectId id;

    @Indexed(name = "deptName")
    private String name;

    private String description;

    Number number;
}
//Department.java