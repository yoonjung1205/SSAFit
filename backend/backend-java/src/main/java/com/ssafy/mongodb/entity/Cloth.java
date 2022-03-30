package com.ssafy.mongodb.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.ArrayList;

@Document("cloth")
@AllArgsConstructor
@Data
public class Cloth {

    @Id
    private ObjectId id;

    private Number newClothId;

    private Number clothId;

    private Number largeCategory;

    private String largeCategoryName;

    private Number smallCategoryHalfshort;

    private Number smallCategoryShirt;

    private Number smallCategoryCollar;

    private Number smallCategoryHoody;

    private Number smallCategorySweatshirt;

    private Number smallCategoryKnit;

    private Number smallCategoryLong;

    private Number smallCategoryShort;

    private Number smallCategoryOthers;

    private String smallCategoryName;

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

    private String colorName;

    private String clothName;

    private String brand;

    private String clothImg;

    private Number clothPrice;

    private Number date;

    private ArrayList<String> clothHashtags;

    private Number clothMale;

    private Number clothFemale;

    private Number clothRate;

    private Number clothReviewCnt;

    private Number fit;

    private Number feeling;

}
