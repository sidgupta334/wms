package com.wms.employeesService.controller;


import com.wms.employeesService.dto.EmployeeDto;
import com.wms.employeesService.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/employees-internal")
public class InternalController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("create")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean createEmployee(@Valid @RequestBody EmployeeDto employeeDto) {
        return employeeService.createEmployee(employeeDto);
    }
}
