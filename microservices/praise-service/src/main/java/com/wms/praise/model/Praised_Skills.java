package com.wms.praise.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Praised_Skills {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;

    private String praiseId;
    @Column(nullable = false)
    private String skillId;
    private Date timestamp;
}
