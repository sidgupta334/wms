package com.wms.recommedationservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AuthUserResponse {
    private String email;
    private String externalId;
    private boolean isAdmin;
}
