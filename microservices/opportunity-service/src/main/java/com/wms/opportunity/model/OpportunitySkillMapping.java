package com.wms.opportunity.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OpportunitySkillMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "opportunityId")
    @JsonIgnore
    private Opportunity opportunity;
    private String skillId;
    private Date timestamp = new Date();
}
