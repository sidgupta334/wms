package com.wms.employeesService.service;

import com.wms.employeesService.dto.CreateEmployeesDto;
import com.wms.employeesService.dto.EmployeeDto;
import com.wms.employeesService.dto.EmployeesResponseDto;
import com.wms.employeesService.dto.JobTitleResponse;
import com.wms.employeesService.model.Employee;
import com.wms.employeesService.repository.EmployeeRepository;
import com.wms.employeesService.utils.IEmployeesCreateResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;


    public IEmployeesCreateResult createEmployees(CreateEmployeesDto employeesDto) {
        IEmployeesCreateResult result = new IEmployeesCreateResult(0, 0);
        Arrays.stream(employeesDto.getEmployees()).sequential().forEach(employeeDto -> {
            boolean res = createEmployee(employeeDto);
            if (res) {
                result.setSuccessCount(result.getSuccessCount() + 1);
            } else {
                result.setFailedCount(result.getFailedCount() + 1);
            }
        });

        return result;
    }

    public boolean createEmployee(EmployeeDto employeeDto) {
        Employee employee = Employee.builder()
                .externalId(employeeDto.getExternalId())
                .name(employeeDto.getName())
                .email(employeeDto.getEmail())
                .isActive(true)
                .timestamp(new Date())
                .isActive(false)
                .build();


        Employee existingEmployee = employeeRepository.findByExternalIdOrEmail(employeeDto.getExternalId(), employeeDto.getEmail());
        if (existingEmployee != null) {
            return true;
        }
        try {
            employeeRepository.save(employee);
            log.info("Employee with external Id: " + employeeDto.getExternalId() + " saved successfully...");
            return true;
        } catch (Exception e) {
            log.error("Something went wrong while creating employee..." + e);
            return false;
        }
    }

    public List<EmployeesResponseDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(this::mapToEmployeeResponseDto).toList();
    }

    private EmployeesResponseDto mapToEmployeeResponseDto(Employee employee) {
        JobTitleResponse jobTitle = null;
        if (employee.getJobTitleId() != null) {
            jobTitle = webClientBuilder.build().get()
                    .uri("http://LIGHTCAST-SERVICE/api/job-titles/" + employee.getJobTitleId())
                    .retrieve()
                    .bodyToMono(JobTitleResponse.class)
                    .block();
        }
        return EmployeesResponseDto.builder()
                .entityId(employee.getEntityId())
                .externalId(employee.getExternalId())
                .email(employee.getEmail())
                .name(employee.getName())
                .jobTitle(jobTitle)
                .build();
    }

}
