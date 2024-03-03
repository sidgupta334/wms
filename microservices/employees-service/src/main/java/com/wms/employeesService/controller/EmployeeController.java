package com.wms.employeesService.controller;

import com.wms.employeesService.dto.*;
import com.wms.employeesService.service.EmployeeService;
import com.wms.employeesService.utils.IEmployeesCreateResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getAllEmployees(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        AuthUserResponse loggedInUser = employeeService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/internal")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getAllEmployeesForInternalUse() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/details/{externalId}")
    @ResponseStatus(HttpStatus.OK)
    public EmployeesResponseDto getEmployeeName(@PathVariable String externalId) {
        return employeeService.getEmployeeByExternalId(externalId);
    }

    @PutMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> updateEmployees(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody UpdateEmployeeDto updateEmployeeDto) {
        AuthUserResponse loggedInUser = employeeService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin() && !Objects.equals(loggedInUser.getExternalId(), updateEmployeeDto.getExternalId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        boolean result = employeeService.updateEmployeeSkillsAndJobTitle(updateEmployeeDto);
        if (result) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
    }

    @PostMapping("create")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean createEmployee(@Valid @RequestBody EmployeeDto employeeDto) {
        return employeeService.createEmployee(employeeDto);
    }
}
