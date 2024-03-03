package com.wms.opportunity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UpdateOpportunityDto {
    private String entityId;
    private String title;
    private String description;
    private String jobTitleId;
    private String creatorId;
    private String[] skills;
}
