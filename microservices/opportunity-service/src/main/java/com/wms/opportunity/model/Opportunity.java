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
    private String job_title_id;

    @Column(nullable = false)
    private String creator_id;

    private String description;
    private Date timestamp;
}
