package com.wms.opportunity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OpportunityResponseDto {
    private String entityId;
    private String title;
    private JobTitleAndSkillResponseDto jobTitle;
    private EmployeeSearchResponseDto creator;
    private String description;
    private List<JobTitleAndSkillResponseDto> skills;
    private Date timestamp;
}
