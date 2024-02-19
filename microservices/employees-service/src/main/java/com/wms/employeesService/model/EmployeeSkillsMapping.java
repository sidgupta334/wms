package com.wms.employeesService.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class EmployeeSkillsMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employeeId")
    @JsonIgnore
    private Employee employee;
    private String skillId;
    private Date timestamp = new Date();
}
