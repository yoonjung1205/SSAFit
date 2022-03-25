package com.ssafy.db.entity.codi;

import com.ssafy.db.entity.cloth.UserGoods;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CodiReview {

    @EmbeddedId
    private UserCodi userCodi;

    private String comment;

    private int klass;

    private int orders;

    private int groupNum;
}
