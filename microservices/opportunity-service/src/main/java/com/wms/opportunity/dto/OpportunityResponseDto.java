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
    private String job_title_id;
    private String creator_id;
    private String description;
}
