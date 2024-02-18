package com.wms.employeesService.utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class IEmployeesCreateResult {
    private int successCount;
    private int failedCount;
}
