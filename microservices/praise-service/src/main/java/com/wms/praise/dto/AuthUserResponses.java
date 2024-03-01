package com.wms.praise.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AuthUserResponses {
    private String email;
    private String externalId;
    private boolean isAdmin;
}
