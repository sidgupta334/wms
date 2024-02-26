package com.wms.recommedationservice.repository;

import com.wms.recommedationservice.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends ElasticsearchRepository<Employee, String> {
    Page<Employee> findByNameContaining(String query, Pageable pageable);
}
