package com.wms.recommedationservice.controller;

import com.wms.recommedationservice.dto.AuthUserResponse;
import com.wms.recommedationservice.dto.EmployeeRequest;
import com.wms.recommedationservice.model.Employee;
import com.wms.recommedationservice.service.AuthService;
import com.wms.recommedationservice.service.EmployeeSearchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search/employees")
public class EmployeeSearchController {

    @Autowired
    private EmployeeSearchService employeeSearchService;

    @Autowired
    private AuthService authService;

    @PostMapping("sync")
    public String syncEmployee(@Valid @RequestBody EmployeeRequest employeeRequest) {
        employeeSearchService.addEmployee(employeeRequest);
        return "Success";
    }

    @GetMapping("")
    public ResponseEntity<?> searchSkills(@RequestParam String term) {
        return ResponseEntity.ok(employeeSearchService.searchEmployeesByName(term));
    }

    @GetMapping("{externalId}")
    public Employee findEmployeeByExternalId(@PathVariable String externalId) {
        return employeeSearchService.getEmployeeByExternalId(externalId);
    }

    @GetMapping("reindex")
    public ResponseEntity<String> reindexEmployees(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        AuthUserResponse loggedInUser = authService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        Thread thread = new Thread(() -> {
            employeeSearchService.reindexAllEmployees();
        });
        thread.start();
        return ResponseEntity.ok("Employees reindex started...");
    }
}
