package com.ssafy.db.entity.codi;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.cloth.Goods;
import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@Embeddable
public class UserCodi implements Serializable {

    @ManyToOne
    @JoinColumn(name="USER_ID")
    User user;

    @ManyToOne
    @JoinColumn(name="CODI_ID", referencedColumnName = "CODI_ID")
    Codi codi;
}
