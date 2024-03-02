package com.wms.opportunity.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OpportunityDto {
    private String title;
    private String jobTitleId;
    private String creatorId;
    private String description;
    private String[] skills;
}
