package com.ssafy.db.entity.cloth;

import com.ssafy.db.entity.User;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String reviewId;

    @ManyToOne
    private User user;

    private String comment;


}
