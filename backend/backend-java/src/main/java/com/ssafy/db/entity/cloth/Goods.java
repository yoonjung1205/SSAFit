package com.ssafy.db.entity.cloth;

import com.ssafy.db.entity.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Goods {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    long GOODS_ID;

    String name;

    Long price;

    String brand;

    String goodsImg;

}
