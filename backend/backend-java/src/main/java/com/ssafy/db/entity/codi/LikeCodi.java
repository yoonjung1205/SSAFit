package com.ssafy.db.entity.codi;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class LikeCodi {

    @EmbeddedId
    private UserCodi userCodi;
}
