package com.wms.recommedationservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class EmployeeRequest {
    private String externalId;
    private String name;
    private String email;
    private boolean isAdmin;
    private String jobTitleId;
    private List<String> skillIds;
}
