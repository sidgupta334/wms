package com.wms.employeesService.controller;

import com.wms.employeesService.dto.CreateEmployeesDto;
import com.wms.employeesService.dto.EmployeeDto;
import com.wms.employeesService.dto.EmployeesResponseDto;
import com.wms.employeesService.service.EmployeeService;
import com.wms.employeesService.utils.IEmployeesCreateResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;



    @PostMapping("create")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean createEmployee(@Valid @RequestBody EmployeeDto employeeDto) {
        return employeeService.createEmployee(employeeDto);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeesResponseDto> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

}
