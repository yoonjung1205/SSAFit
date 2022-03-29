package com.ssafy.mongodb.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@Document("user_ssafit")
public class UserTop {

    @Id
    private ObjectId id;

    private Number userId;
    private String userName;


    private Number largecategory;


    private Number userMale;
    private Number userFemale;
    private Number userHeight;
    private Number userWeight;

    private Number size;
    private Number bright;
    private Number color;
    private Number thickness;
    private Number weightness;
    private Number touch;

    private Number smallCategoryHalfshort;
    private Number smallCategoryShirt;
    private Number smallCategoryCollar;
    private Number smallCategoryHoody;
    private Number smallCategorySweatshirt;
    private Number smallCategoryKnit;
    private Number smallCategoryLong;
    private Number smallCategoryShort;
    private Number smallCategoryOthers;

    private Number colorWhite;
    private Number colorGrey;
    private Number colorBlack;
    private Number colorRed;
    private Number colorPink;
    private Number colorOrange;
    private Number colorIvory;
    private Number colorYellow;
    private Number colorGreen;
    private Number colorBlue;
    private Number colorPurple;
    private Number colorBrown;
    private Number colorBeige;
    private Number colorJean;
    private Number colorPattern;
    private Number colorOthers;

}