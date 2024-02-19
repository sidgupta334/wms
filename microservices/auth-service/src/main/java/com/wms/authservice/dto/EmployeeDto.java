package com.wms.authservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class EmployeeDto {
    @NotBlank
    private String externalId;

    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    private String password = "default";

    @NotBlank
    private Boolean isAdmin;

    private String jobTitleId;
}
