package com.ssafy.db.entity.codi;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.cloth.UserGoods;
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
public class CodiReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String reviewId;

    @ManyToOne
    private User user;

    private String comment;

//    private int klass;
//
//    private int orders;
//
//    private int groupNum;
}
