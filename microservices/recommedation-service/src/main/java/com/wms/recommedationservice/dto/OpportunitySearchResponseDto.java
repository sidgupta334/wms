package com.wms.recommedationservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OpportunitySearchResponseDto {
    private String entityId;
    private String title;
    private String description;
    private Date timestamp;
    private JobTitleAndSkillResponseDto jobTitle;
    private List<JobTitleAndSkillResponseDto> skills;
}
