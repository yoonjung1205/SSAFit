package com.ssafy.mongodb.entity;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.ArrayList;

@Document("cloth")
@AllArgsConstructor
public class cloth_1 {

    @Id
    private String id;

    private int newClothId;

    private int clothId;

    private int largeCategory;

    private String largeCategoryName;

    private int smallCategoryHalfshort;

    private int smallCategoryShirt;

    private int smallCategoryCollar;

    private int smallCategoryHoody;

    private int smallCategorySweatshirt;

    private int smallCategoryKnit;

    private int smallCategoryLong;

    private int smallCategoryShort;

    private int smallCategoryOthers;

    private String smallCategoryName;

    private int colorWhite;

    private int colorGrey;

    private int colorBlack;

    private int colorRed;

    private int colorPink;

    private int colorOrange;

    private int colorIvory;

    private int colorYellow;

    private int colorGreen;

    private int colorBlue;

    private int colorPurple;

    private int colorBrown;

    private int colorBeige;

    private int colorJean;

    private int colorPattern;

    private int colorOthers;

    private String colorName;

    private String clothName;

    private String brand;

    private String clothImg;

    private int clothPrice;

    private int date;

    private ArrayList<String> clothHashtags;

    private int clothMale;

    private int clothFemale;

    private int clothRate;

    private int clothReviewCnt;

    private int fit;



}
