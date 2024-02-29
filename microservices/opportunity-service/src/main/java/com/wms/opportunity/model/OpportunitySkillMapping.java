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
public class OpportunitySkillMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;
    private String opportunityId;
    private String skillId;
    private Date timestamp;
}
