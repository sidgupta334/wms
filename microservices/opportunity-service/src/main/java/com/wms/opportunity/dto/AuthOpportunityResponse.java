package com.wms.opportunity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AuthOpportunityResponse {
    private String jobTitleId;
    private String creatorId;
    private boolean isValid;
}
