package com.wms.recommedationservice.service;

import com.wms.recommedationservice.dto.EmployeeRequest;
import com.wms.recommedationservice.dto.EmployeeSearchResponseDto;
import com.wms.recommedationservice.dto.JobTitleAndSkillResponseDto;
import com.wms.recommedationservice.model.Employee;
import com.wms.recommedationservice.model.JobTitle;
import com.wms.recommedationservice.model.Skill;
import com.wms.recommedationservice.repository.EmployeeRepository;
import com.wms.recommedationservice.repository.JobTitleRepository;
import com.wms.recommedationservice.repository.SkillRepository;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
@Slf4j
public class EmployeeSearchService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JobTitleRepository jobTitleRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public void addEmployee(EmployeeRequest employeeRequest) {
        if (employeeRequest == null) return;
        try {
            JobTitle jobTitle = getJobTitleById(employeeRequest.getJobTitleId());
            List<Skill> skills = getSkillsByIds(employeeRequest.getSkillIds());
            Employee employeeToSave = Employee.builder()
                    .name(employeeRequest.getName())
                    .externalId(employeeRequest.getExternalId())
                    .email(employeeRequest.getEmail())
                    .isAdmin(employeeRequest.isAdmin())
                    .jobTitle(jobTitle)
                    .skills(skills)
                    .build();

            Optional<Employee> existingEmployee = employeeRepository.findById(employeeRequest.getExternalId());
            existingEmployee.ifPresent(employee -> employeeRepository.delete(employee));
            employeeRepository.save(employeeToSave);
        } catch (Exception e) {
            log.error("Something went wrong while storing Employee data to Elasticsearch" + e);
            throw new ValidationException("Something went wrong while saving Employee..." + e);
        }
    }

    public void reindexAllEmployees() {
        List<EmployeeSearchResponseDto> employeesToReindex = Arrays.stream(getAllEmployees()).toList();
        employeesToReindex.forEach(employee -> {
            try {
                addEmployee(EmployeeRequest.builder()
                        .externalId(employee.getExternalId())
                        .name(employee.getName())
                        .isAdmin(employee.isAdmin())
                        .email(employee.getEmail())
                        .skillIds(employee.getSkills().stream().map(JobTitleAndSkillResponseDto::getId).toList())
                        .jobTitleId(employee.getJobTitle() != null ? employee.getJobTitle().getId() : null)
                        .build());
                log.info("Employee " + employee.getExternalId() + " reindexed...");
            } catch (Exception e) {
                log.error("Something went wrong while reindexing " + employee.getExternalId() + ", error: " + e);
            }
        });
        log.info("Employee reindex completed successfully...");
    }

    public List<Employee> searchEmployeesByName(String query) {
        Pageable pageable = PageRequest.of(0, 100);
        return employeeRepository.findByNameContaining(query, pageable).stream().toList();
    }

    public Employee getEmployeeByExternalId(String externalId) {
        return employeeRepository.findByExternalId(externalId);
    }

    private JobTitle getJobTitleById(String id) {
        if (id == null) return null;
        Optional<JobTitle> jobTitleOptional = jobTitleRepository.findById(id);
        return jobTitleOptional.orElse(null);
    }

    private List<Skill> getSkillsByIds(List<String> skillIds) {
        if (skillIds == null) return new ArrayList<>();
        return skillIds.stream().map(skillId -> {
            Optional<Skill> skill = skillRepository.findById(skillId);
            return skill.orElse(null);
        }).filter(Objects::nonNull).toList();
    }

    private EmployeeSearchResponseDto[] getAllEmployees() {
        return webClientBuilder.build()
                .get()
                .uri("http://EMPLOYEES-SERVICE/api/employees/internal")
                .retrieve()
                .bodyToMono(EmployeeSearchResponseDto[].class)
                .block();
    }
}
