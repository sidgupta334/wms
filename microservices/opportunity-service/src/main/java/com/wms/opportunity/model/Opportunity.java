package com.wms.opportunity.model;

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
public class Opportunity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String jobTitleId;

    @Column(nullable = false)
    private String creatorId;

    private String description;
    private Date timestamp;
}
