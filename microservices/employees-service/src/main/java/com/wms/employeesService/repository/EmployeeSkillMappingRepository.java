package com.wms.employeesService.repository;

import com.wms.employeesService.model.EmployeeSkillsMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeSkillMappingRepository extends JpaRepository<EmployeeSkillsMapping, String> {
}
