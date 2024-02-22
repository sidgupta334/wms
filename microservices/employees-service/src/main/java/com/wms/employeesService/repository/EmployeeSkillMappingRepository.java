package com.wms.employeesService.repository;

import com.wms.employeesService.model.Employee;
import com.wms.employeesService.model.EmployeeSkillsMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeSkillMappingRepository extends JpaRepository<EmployeeSkillsMapping, String> {

    public List<EmployeeSkillsMapping> findAllByEmployee(Employee employee);
}
