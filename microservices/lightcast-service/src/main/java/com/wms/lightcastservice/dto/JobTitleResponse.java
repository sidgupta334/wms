package com.wms.lightcastservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class JobTitleResponse {
    private String entityId;
    private String externalCode;
    private String name;
}
