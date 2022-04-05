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

    private String brand;
    private String clothName;
    private long clothPrice;
    private String clothImg;
    private long newClothId;

    private boolean likes;
}
