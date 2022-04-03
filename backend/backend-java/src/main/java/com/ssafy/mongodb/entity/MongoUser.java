package com.ssafy.mongodb.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;

@Data
@Document("user_ssafit")
public class MongoUser {

    @Id
    private ObjectId id;

    @Field
    private Number userId = 0;

    private String userName;

    @Field
    private Number largecategory = 0;

    @Field
    private Number userMale = 0;
    @Field
    private Number userFemale = 0;
    @Field
    private Number userHeight = 0;
    @Field
    private Number userWeight = 0;

    @Field
    private Number size = 0;
    @Field
    private Number bright = 0;
    @Field
    private Number color = 0;
    @Field
    private Number thickness = 0;
    @Field
    private Number weightness = 0;
    @Field
    private Number touch = 0;
}
