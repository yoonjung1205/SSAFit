package com.ssafy.db.entity.cloth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GoodsReview {

    @EmbeddedId
    private UserGoods userGoods;

    private String comment;

    private int klass;

    private int orders;

    private int groupNum;

}
