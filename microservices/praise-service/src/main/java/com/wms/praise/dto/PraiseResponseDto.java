package com.wms.praise.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PraiseResponseDto {
    private String entityId;
    private String title;
    private String giverId;
    private String receiverId;
    private String description;
    private List<String> skillsList;
}
