package com.wms.recommedationservice.service;

import com.wms.recommedationservice.dto.EmployeeSearchResponseDto;
import com.wms.recommedationservice.dto.JobTitleAndSkillResponseDto;
import com.wms.recommedationservice.dto.OpportunityResponseDto;
import com.wms.recommedationservice.dto.OpportunitySearchResponseDto;
import com.wms.recommedationservice.model.Employee;
import com.wms.recommedationservice.model.JobTitle;
import com.wms.recommedationservice.model.Opportunity;
import com.wms.recommedationservice.model.Skill;
import com.wms.recommedationservice.repository.JobTitleRepository;
import com.wms.recommedationservice.repository.OpportunityRepository;
import com.wms.recommedationservice.repository.SkillRepository;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
@Slf4j
public class OpportunitySearchService {

    @Autowired
    private OpportunityRepository opportunityRepository;

    @Autowired
    private JobTitleRepository jobTitleRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private EmployeeSearchService employeeSearchService;

    @Autowired
    private WebClient.Builder webClientBuilder;


    public void reindexOpportunity(String entityId) {
        OpportunityResponseDto opportunity = getOriginalOpportunityByEntityId(entityId);
        reindexSingleOpportunity(opportunity);
    }

    public void removeOpportunityIndex(String entityId) {
        opportunityRepository.deleteById(entityId);
    }

    public void reindexAllOpportunities() {
        List<OpportunityResponseDto> opportunities = Arrays.stream(getAllOriginalOpportunities()).toList();
        opportunities.forEach(this::reindexSingleOpportunity);
        log.info("Opportunity reindex completed successfully...");
    }

    public List<OpportunitySearchResponseDto> searchOpportunitiesByTitle(String title) {
        List<Opportunity> opportunities = opportunityRepository.searchOpportunitiesByTitle(title);
        return opportunities.stream().map(this::mapToOpportunitySearchResponseDto).toList();
    }

    public List<OpportunitySearchResponseDto> suggestOpportunities(String externalId) {
        Employee employee = employeeSearchService.getEmployeeByExternalId(externalId);
        List<String> skills = employee.getSkills().stream().map(Skill::getExternalCode).toList();
        List<Opportunity> opportunities = opportunityRepository.suggestOpportunities(skills);
        return  opportunities.stream().map(this::mapToOpportunitySearchResponseDto).toList();
    }

    private void reindexSingleOpportunity(OpportunityResponseDto opportunity) {
        try {
            addOpportunity(opportunity);
        } catch (Exception e) {
            log.error("Something went wrong while reindexing opportunity: " + opportunity.getEntityId() + ", error: " + e);
        }
    }

    private void addOpportunity(OpportunityResponseDto opportunityRequest) {
        if (opportunityRequest == null) return;
        try {
            JobTitle jobTitle = getJobTitleById(opportunityRequest.getJobTitle().getId());
            List<Skill> skills = getSkillsByIds(opportunityRequest.getSkills().stream().map(JobTitleAndSkillResponseDto::getId).toList());
            Opportunity opportunity = Opportunity.builder()
                    .entityId(opportunityRequest.getEntityId())
                    .title(opportunityRequest.getTitle())
                    .description(opportunityRequest.getDescription())
                    .timestamp(opportunityRequest.getTimestamp())
                    .jobTitle(jobTitle)
                    .skills(skills)
                    .build();
            Optional<Opportunity> existingOpportunity = opportunityRepository.findByEntityId(opportunityRequest.getEntityId());
            existingOpportunity.ifPresent(op -> opportunityRepository.delete(op));
            opportunityRepository.save(opportunity);
            log.info("Opportunity reindexed with entityId: " + opportunity.getEntityId());
        } catch (Exception e) {
            log.error("Something went wrong while storing Opportunity data to Elasticsearch" + e);
            throw new ValidationException("Something went wrong while saving Opportunity..." + e);
        }
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


    private OpportunityResponseDto[] getAllOpportunities() {
        return webClientBuilder.build()
                .get()
                .uri("http://OPPORTUNITY-SERVICE/api/opportunity/get")
                .retrieve()
                .bodyToMono(OpportunityResponseDto[].class)
                .block();
    }

    private OpportunityResponseDto getOriginalOpportunityByEntityId(String entityId) {
        return webClientBuilder.build()
                .get()
                .uri("http://OPPORTUNITY-SERVICE/api/opportunity/get/" + entityId)
                .retrieve()
                .bodyToMono(OpportunityResponseDto.class)
                .block();
    }

    private OpportunityResponseDto[] getAllOriginalOpportunities() {
        return webClientBuilder.build()
                .get()
                .uri("http://OPPORTUNITY-SERVICE/api/opportunity/get")
                .retrieve()
                .bodyToMono(OpportunityResponseDto[].class)
                .block();
    }

    private OpportunitySearchResponseDto mapToOpportunitySearchResponseDto(Opportunity opportunity) {
        JobTitleAndSkillResponseDto jobTitle = JobTitleAndSkillResponseDto.builder()
                .name(opportunity.getJobTitle().getName())
                .externalCode(opportunity.getJobTitle().getExternalCode())
                .id(opportunity.getJobTitle().getExternalCode())
                .build();

        List<JobTitleAndSkillResponseDto> skills = opportunity.getSkills().stream().map(skill -> JobTitleAndSkillResponseDto.builder()
                .externalCode(skill.getExternalCode())
                .id(skill.getExternalCode())
                .name(skill.getName())
                .build()).toList();

        return OpportunitySearchResponseDto.builder()
                .entityId(opportunity.getEntityId())
                .title(opportunity.getTitle())
                .description(opportunity.getDescription())
                .jobTitle(jobTitle)
                .skills(skills)
                .build();
    }
}
