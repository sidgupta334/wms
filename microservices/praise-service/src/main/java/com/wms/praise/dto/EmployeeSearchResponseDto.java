package com.wms.praise.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class EmployeeSearchResponseDto {
    private String entityId;
    private String externalId;
    private String name;
    private String email;
    private boolean isAdmin;
    private JobTitleAndSkillResponseDto jobTitle;
    private List<JobTitleAndSkillResponseDto> skills;
}
