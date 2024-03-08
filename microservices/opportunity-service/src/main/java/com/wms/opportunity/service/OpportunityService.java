package com.wms.opportunity.service;

import com.wms.opportunity.config.WebClientConfig;
import com.wms.opportunity.dto.*;
import com.wms.opportunity.model.Opportunity;
import com.wms.opportunity.model.OpportunitySkillMapping;
import com.wms.opportunity.repository.OpportunityRepository;
import com.wms.opportunity.repository.OpportunitySkillRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class OpportunityService {

    @Autowired
    private OpportunityRepository opportunityRepository;

    @Autowired
    private OpportunitySkillRepository opportunitySkillRepository;
    @Autowired
    private WebClientConfig webClientConfig;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Transactional
    public boolean createOpportunity(OpportunityDto opportunityDto) {
        // log.info("Opportunity with job title Id: " + opportunityDto.getJobTitleId()+"and creator id"+opportunityDto.getCreatorId() + " saved successfully...");
        List<JobTitleAndSkillResponseDto> skills = getSkillsFromIds(opportunityDto.getSkills());

        if (skills == null || (skills.size() < opportunityDto.getSkills().length)) {
            log.error("Some skills are invalid in the request");
            return false;
        }
        Opportunity opportunity = Opportunity.builder()
                .title(opportunityDto.getTitle())
                .description(opportunityDto.getDescription())
                .jobTitleId(opportunityDto.getJobTitleId())
                .creatorId(opportunityDto.getCreatorId())
                .timestamp(new Date())
                .build();
        try {
            opportunityRepository.save(opportunity);
            indexOpportunity(opportunity.getEntityId());
            List<OpportunitySkillMapping> mappings = Arrays.stream(opportunityDto.getSkills()).map(skill -> OpportunitySkillMapping.builder()
                    .opportunity(opportunity)
                    .skillId(skill)
                    .timestamp(new Date())
                    .build()
            ).toList();
            opportunitySkillRepository.saveAll(mappings);
            log.info("Opportunity with job title Id: " + opportunityDto.getJobTitleId() + "and creator id" + opportunityDto.getCreatorId() + " saved successfully...");
            return true;
        } catch (Exception e) {
            log.error("Something went wrong while creating praise..." + e);
            return false;
        }

    }

    public List<OpportunityResponseDto> getAllOpportunity() {
        List<Opportunity> opportunityList = opportunityRepository.findAll();
        return opportunityList.stream().map(this::mapToOpportunityResponseDto).toList();
    }

    private List<OpportunitySkillMapping> getAllSkillsByOpportunity(Opportunity opportunity) {
        return opportunitySkillRepository.findByOpportunity(opportunity);
    }

    public AuthUserResponse getLoggedInUser(String token) {
        return webClientBuilder.build()
                .get()
                .uri("http://AUTH-SERVICE/api/auth/extract/" + token)
                .retrieve()
                .bodyToMono(AuthUserResponse.class)
                .block();
    }

    public List<OpportunityResponseDto> getOpportunityById(String id) {
        List<Opportunity> opportunityList = opportunityRepository.findByJobTitleId(id);
        return opportunityList.stream().map(this::mapToOpportunityResponseDto).toList();
    }

    public boolean updateOpportunity(UpdateOpportunityDto updateOpportunityDto) {
        try {
            Opportunity opportunity = opportunityRepository.findByEntityId(updateOpportunityDto.getEntityId());
            if (opportunity == null) {
                log.error("Opportunity is invalid in the request");
                return false;
            }
            List<JobTitleAndSkillResponseDto> skills = getSkillsFromIds(updateOpportunityDto.getSkills());

            if (skills == null || (skills.size() < updateOpportunityDto.getSkills().length)) {
                log.error("Some skills are invalid in the request");
                return false;
            }
            opportunity.setJobTitleId(updateOpportunityDto.getJobTitleId());
            opportunity.setCreatorId(updateOpportunityDto.getCreatorId());
            opportunity.setDescription(updateOpportunityDto.getDescription());
            opportunity.setTitle(updateOpportunityDto.getTitle());
            opportunity.setTimestamp(new Date());

            opportunityRepository.save(opportunity);
            indexOpportunity(opportunity.getEntityId());
            List<OpportunitySkillMapping> opportunitySkillMappings = opportunitySkillRepository.findByOpportunity(opportunity);
            opportunitySkillMappings.forEach(mapping -> {
                opportunitySkillRepository.delete(mapping);
            });
            List<OpportunitySkillMapping> updatedMappings = skills.stream().map(skill -> OpportunitySkillMapping.builder()
                    .opportunity(opportunity)
                    .skillId(skill.getId())
                    .build()

            ).toList();
            opportunitySkillRepository.saveAll(updatedMappings);
            return true;
        } catch (
                Exception e) {
            log.error("Something went wrong while updating employee.." + e);
            return false;
        }
    }

    @Transactional
    public boolean deleteOpportunity(String id, AuthUserResponse loggedInUser) {
        Opportunity opportunity = opportunityRepository.findByEntityId(id);
        if (opportunity == null) return false;
        if (!loggedInUser.isAdmin() && !opportunity.getCreatorId().equals(loggedInUser.getExternalId())) {
            throw new ValidationException("Invalid Request");
        }
        opportunitySkillRepository.deleteAllByOpportunity(opportunity);
        opportunityRepository.delete(opportunity);
        deleteOpportunityIndex(opportunity.getEntityId());
        return true;
    }

    private OpportunityResponseDto mapToOpportunityResponseDto(Opportunity opportunity) {
        String entity = opportunity.getEntityId();
        List<OpportunitySkillMapping> mappings = getAllSkillsByOpportunity(opportunity);
        String[] skillIds = mappings.stream().map(OpportunitySkillMapping::getSkillId).toArray(String[]::new);

        List<JobTitleAndSkillResponseDto> skills = getSkillsFromIds(skillIds);
        JobTitleAndSkillResponseDto jobTitle = getJobTitleFromId(opportunity.getJobTitleId());
        EmployeeSearchResponseDto employeeSearchResponseDto = getEmployeeById(opportunity.getCreatorId());

        return OpportunityResponseDto.builder()
                .entityId(opportunity.getEntityId())
                .title(opportunity.getTitle())
                .description(opportunity.getDescription())
                .skills(skills)
                .jobTitle(jobTitle)
                .timestamp(opportunity.getTimestamp())
                .creator(employeeSearchResponseDto)
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

    private EmployeeSearchResponseDto getEmployeeById(String id) {
        return webClientBuilder.build().get()
                .uri("http://RECOMMENDATION-SERVICE/api/search/employees/" + id)
                .retrieve()
                .bodyToMono(EmployeeSearchResponseDto.class)
                .block();
    }

    private void indexOpportunity(String entityId) {
        try {
            webClientBuilder.baseUrl("http://RECOMMENDATION-SERVICE").build()
                    .get()
                    .uri("/api/search/opportunity/index/" + entityId)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (Exception e) {
            log.error("Something went wrong while indexing opportunity..." + e);
        }
    }

    private void deleteOpportunityIndex(String entityId) {
        try {
            webClientBuilder.baseUrl("http://RECOMMENDATION-SERVICE").build()
                    .delete()
                    .uri("/api/search/opportunity/" + entityId)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (Exception e) {
            log.error("Something went wrong while deleting opportunity index..." + e);
        }
    }

}
