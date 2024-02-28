package com.wms.opportunity.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OpportunityDto {
    private String title;
    private String job_title_id;
    private String creator_id;
    private String description;
}
