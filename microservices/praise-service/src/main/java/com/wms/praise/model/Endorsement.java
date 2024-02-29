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
public class Endorsement {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;

    @Column(nullable = false)
    private String skillId;
    @Column(nullable = false)
    private String giverId;
    @Column(nullable = false)
    private String receiveId;
    private Date timestamp;

}
