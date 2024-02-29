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
    private String giverId;
    private String receiverId;
    private boolean isValid;
}
