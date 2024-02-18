package com.wms.employeesService.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeesResponseDto {
    private String entityId;
    private String externalId;
    private String name;
    private String email;
    private boolean isAdmin;
    private JobTitleResponse jobTitle;
    private List<String> skillIds;
}
