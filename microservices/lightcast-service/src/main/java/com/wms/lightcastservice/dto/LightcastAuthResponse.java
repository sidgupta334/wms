package com.wms.lightcastservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class LightcastAuthResponse {

    private String access_token;
    private Long expires_in;
    private String token_type;
    private String scope;
}
