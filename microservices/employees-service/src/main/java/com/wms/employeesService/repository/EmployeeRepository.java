package com.wms.employeesService.repository;

import com.wms.employeesService.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

    public Employee findByExternalIdOrEmail(String externalId, String email);
    public Employee findByExternalId(String externalId);
}
