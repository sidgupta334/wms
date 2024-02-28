package com.wms.praise.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AuthUserResponse {
    private String giver_id;
    private String receiver_id;
    private boolean isValid;
}
