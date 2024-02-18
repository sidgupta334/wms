package com.wms.employeesService.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    private String externalId;
    private String name;
    private String email;
    private String jobTitleId;
}
