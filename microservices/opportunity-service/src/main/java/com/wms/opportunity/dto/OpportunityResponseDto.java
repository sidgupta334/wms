package com.wms.opportunity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OpportunityResponseDto {
    private String entityId;
    private String title;
    private String jobTitleId;
    private String creatorId;
    private String description;
}
