package com.wms.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeesResponse {
    private String entityId;
    private String externalId;
    private String name;
    private String email;
    private boolean isAdmin;
    private JobTitleAndSkillResponse jobTitle;
    private List<JobTitleAndSkillResponse> skills;
}
