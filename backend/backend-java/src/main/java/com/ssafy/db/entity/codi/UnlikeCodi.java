package com.ssafy.db.entity.codi;

import com.ssafy.db.entity.cloth.UserGoods;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class UnlikeCodi {

    @EmbeddedId
    private UserCodi userCodi;
}
