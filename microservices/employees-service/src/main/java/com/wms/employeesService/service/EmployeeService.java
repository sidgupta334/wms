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
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
@Slf4j
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSkillMappingRepository employeeSkillMappingRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public EmployeesResponseDto getEmployeeByExternalId(String externalId) {
        return mapToEmployeeResponseDto(employeeRepository.findByExternalId(externalId));
    }

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
            boolean isUserAdmin = isUserAdmin(employee.getEmail());
            indexEmployee(employee, isUserAdmin);
            log.info("Employee " + employee.getExternalId() + " indexed successfully...");
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
            if (skills.size() < employeeDto.getSkillIds().length) {
                log.error("Some skills are invalid in the request");
                return false;
            }

            employee.setJobTitleId(jobTitle.getId());
            employeeRepository.save(employee);

            List<EmployeeSkillsMapping> existingSkillsMapping = employeeSkillMappingRepository.findAllByEmployee(employee);
            existingSkillsMapping.forEach(mapping -> employeeSkillMappingRepository.delete(mapping));
            List<EmployeeSkillsMapping> employeeSkillsMappings = skills.stream().map(skill -> {
                EmployeeSkillsMapping employeeSkillsMapping = new EmployeeSkillsMapping();
                employeeSkillsMapping.setEmployee(employee);
                employeeSkillsMapping.setSkillId(skill.getId());
                return employeeSkillsMapping;
            }).toList();

            employeeSkillMappingRepository.saveAll(employeeSkillsMappings);
            List<String> skillIds = employeeSkillsMappings.stream().map(EmployeeSkillsMapping::getSkillId).toList();
            boolean isAdmin = isUserAdmin(employee.getEmail());
            employee.setSkillIds(skillIds);
            indexEmployee(employee, isAdmin);
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

        List<EmployeeSkillsMapping> employeeSkillsMappings = employeeSkillMappingRepository.findAllByEmployee(employee);
        String[] skillIds = employeeSkillsMappings.stream().map(EmployeeSkillsMapping::getSkillId).toArray(String[]::new);
        List<JobTitleAndSkillResponseDto> skills = new ArrayList<>();
        if (skillIds.length > 0) {
            skills = getSkillsFromIds(skillIds);
        }

        boolean isAdmin = isUserAdmin(employee.getEmail());

        return EmployeesResponseDto.builder()
                .entityId(employee.getEntityId())
                .externalId(employee.getExternalId())
                .email(employee.getEmail())
                .name(employee.getName())
                .jobTitle(jobTitle)
                .skills(skills)
                .isAdmin(isAdmin)
                .build();
    }

    public AuthUserResponse getLoggedInUser(String token) {
        return webClientBuilder.build()
                .get()
                .uri("http://AUTH-SERVICE/api/auth/extract/" + token)
                .retrieve()
                .bodyToMono(AuthUserResponse.class)
                .block();
    }

    private boolean isUserAdmin(String email) {
        AuthUserResponse userResponse = webClientBuilder.build()
                .get()
                .uri("http://AUTH-SERVICE/api/auth/email/" + email)
                .retrieve()
                .bodyToMono(AuthUserResponse.class)
                .block();

        if (userResponse == null) return false;
        return userResponse.isAdmin();
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

    private void indexEmployee(Employee employee, boolean isAdmin) {
        String jobTitleId = employee.getJobTitleId() != null ? employee.getJobTitleId() : null;
        List<String> skillIds = employee.getSkillIds() != null ? employee.getSkillIds() : new ArrayList<>();
        EmployeeIndexRequest employeeIndexRequest = EmployeeIndexRequest.builder()
                .externalId(employee.getExternalId())
                .name(employee.getName())
                .isAdmin(isAdmin)
                .email(employee.getEmail())
                .jobTitleId(jobTitleId)
                .skillIds(skillIds)
                .build();

        try {
            webClientBuilder.baseUrl("http://RECOMMENDATION-SERVICE").build()
                    .post()
                    .uri("/api/search/employees/sync")
                    .body(BodyInserters.fromValue(employeeIndexRequest))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (Exception e) {
            log.error("Something went wrong while indexing employee..." + e);
        }
    }
}
