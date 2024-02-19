package com.wms.employeesService.service;

import com.wms.employeesService.dto.*;
import com.wms.employeesService.model.Employee;
import com.wms.employeesService.model.EmployeeSkillsMapping;
import com.wms.employeesService.repository.EmployeeRepository;
import com.wms.employeesService.repository.EmployeeSkillMappingRepository;
import com.wms.employeesService.utils.IEmployeesCreateResult;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSkillMappingRepository employeeSkillMappingRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Transactional
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

    @Transactional()
    public boolean updateEmployeeSkillsAndJobTitle(UpdateEmployeeDto employeeDto) {
        try {
            Employee employee = employeeRepository.findByExternalId(employeeDto.getExternalId());
            JobTitleAndSkillResponseDto jobTitle = getJobTitleFromId(employeeDto.getJobTitleId());
            List<JobTitleAndSkillResponseDto> skills = getSkillsFromIds(employeeDto.getSkillIds());
            if (employee == null || jobTitle == null || skills == null) {
                return false;
            }
            skills.removeAll(Collections.singleton(null));
            if (skills.size() < employeeDto.getSkillIds().length) {
                return false;
            }

            employee.setJobTitleId(jobTitle.getId());
            employeeRepository.save(employee);

            List<EmployeeSkillsMapping> employeeSkillsMappings = skills.stream().map(skill -> {
                EmployeeSkillsMapping employeeSkillsMapping = new EmployeeSkillsMapping();
                employeeSkillsMapping.setEmployee(employee);
                employeeSkillsMapping.setSkillId(skill.getId());
                return employeeSkillsMapping;
            }).toList();

            employeeSkillMappingRepository.saveAll(employeeSkillsMappings);
            return true;

        } catch (Exception e) {
            log.error("Something went wrong while updating employee.." + e);
            return false;
        }
    }

    private EmployeesResponseDto mapToEmployeeResponseDto(Employee employee) {
        JobTitleAndSkillResponseDto jobTitle = null;
        if (employee.getJobTitleId() != null) {
            jobTitle = getJobTitleFromId(employee.getJobTitleId());
        }
        return EmployeesResponseDto.builder()
                .entityId(employee.getEntityId())
                .externalId(employee.getExternalId())
                .email(employee.getEmail())
                .name(employee.getName())
                .jobTitle(jobTitle)
                .build();
    }

    private List<JobTitleAndSkillResponseDto> getSkillsFromIds(String[] ids) {
        GetSkillsRequest request = new GetSkillsRequest(ids);
        JobTitleAndSkillResponseDto[] response = webClientBuilder.build().post()
                .uri("http://LIGHTCAST-SERVICE/api/skills")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(JobTitleAndSkillResponseDto[].class)
                .block();
        if (response == null) return null;
        return Arrays.stream(response).toList();
    }

    private JobTitleAndSkillResponseDto getJobTitleFromId(String id) {
        return webClientBuilder.build().get()
                .uri("http://LIGHTCAST-SERVICE/api/job-titles/" + id)
                .retrieve()
                .bodyToMono(JobTitleAndSkillResponseDto.class)
                .block();
    }

}
