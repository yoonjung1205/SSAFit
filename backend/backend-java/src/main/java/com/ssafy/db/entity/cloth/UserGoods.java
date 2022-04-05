package com.ssafy.db.entity.cloth;

import com.ssafy.db.entity.User;
import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@Embeddable
public class UserGoods implements Serializable {

    @ManyToOne
    @JoinColumn(name="USER_ID")
    User user;

    @ManyToOne
    @JoinColumn(name="GOODS_ID", referencedColumnName = "newClothId")
    Goods goods;
}
