package com.wms.praise.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UpdatePraiseDto {
    private String entityId;
    private String title;
    private String description;
    private String giverId;
    private String receiverId;
    private String[] skills;
}
