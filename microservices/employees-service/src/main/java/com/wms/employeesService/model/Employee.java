package com.wms.employeesService.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;
    private String externalId;
    private String name;
    private String email;
    private String jobTitleId;

    @Column(insertable = false, updatable = false)
    private List<String> skillIds;
    private boolean isActive;
    private Date timestamp;
}
