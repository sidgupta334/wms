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
public class Opportunity_Skill_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;
    private String opportunity_id;
    @Column(nullable = false)
    private String skill_id;
    private Date timestamp;
}
