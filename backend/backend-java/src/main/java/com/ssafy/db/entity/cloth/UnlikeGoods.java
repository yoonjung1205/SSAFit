package com.ssafy.db.entity.cloth;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class UnlikeGoods {

    @EmbeddedId
    private UserGoods userGoods;

}
