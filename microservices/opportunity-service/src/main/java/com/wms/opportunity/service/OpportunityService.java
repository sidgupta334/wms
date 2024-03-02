package com.wms.opportunity.service;

import com.wms.opportunity.config.WebClientConfig;
import com.wms.opportunity.dto.*;
import com.wms.opportunity.model.Opportunity;
import com.wms.opportunity.model.OpportunitySkillMapping;
import com.wms.opportunity.repository.OpportunityRepository;
import com.wms.opportunity.repository.OpportunitySkillRepository;
import jakarta.transaction.Transactional;
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

        if (skills == null ||(skills.size() < opportunityDto.getSkills().length))
        {
            log.error("Some skills are invalid in the request");
            return false;
        }
        Opportunity opportunity = new Opportunity().builder()
                .title(opportunityDto.getTitle())
                .description(opportunityDto.getDescription())
                .jobTitleId(opportunityDto.getJobTitleId())
                .creatorId(opportunityDto.getCreatorId())
                .timestamp(new Date())
                .build();
        try {
            opportunityRepository.save(opportunity);
            log.info("Opportunity with job title Id: " + opportunityDto.getJobTitleId()+"and creator id"+opportunityDto.getCreatorId() + " saved successfully...");
            OpportunitySkillMapping opportunitySkillMapping = new OpportunitySkillMapping().builder()
                    .opportunityId(opportunity.getEntityId())
                    .skillId(opportunityDto.getSkills())
                    .timestamp(new Date())
                    .build();
            opportunitySkillRepository.save(opportunitySkillMapping);
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

    private OpportunityResponseDto mapToOpportunityResponseDto(Opportunity opportunity) {
        String entity = opportunity.getEntityId();
        OpportunitySkillMapping opportunitySkills = getAllSkills(entity);
        return OpportunityResponseDto.builder()
                .entityId(opportunity.getEntityId())
                .title(opportunity.getTitle())
                .description(opportunity.getDescription())
                .jobTitleId(opportunity.getJobTitleId())
                .creatorId(opportunity.getCreatorId())
                .skills(opportunitySkills.getSkillId())
                .build();
    }

    private OpportunitySkillMapping getAllSkills(String entity) {
        return opportunitySkillRepository.findByOpportunityId(entity);
    }

    public AuthUserResponse getLoggedInUser(String token)
    {
        return webClientBuilder.build()
                .get()
                .uri("http://AUTH-SERVICE/api/auth/extract/" + token)
                .retrieve()
                .bodyToMono(AuthUserResponse.class)
                .block();
    }

    public List<OpportunityResponseDto> getOpportunity(String id) {
        List<Opportunity> opportunityList = opportunityRepository.findByJobTitleId(id);
        return opportunityList.stream().map(this::mapToOpportunityResponseDto).toList();
    }

    public boolean updateOpportunitySkills(UpdateOpportunityDto updateOpportunityDto) {
        try{
            Opportunity opportunity = opportunityRepository.findByEntityId(updateOpportunityDto.getEntityId());
            if(opportunity == null)
            {
                log.error("Opportunity is invalid in the request");
                return false;
            }
            List<JobTitleAndSkillResponseDto> skills = getSkillsFromIds(updateOpportunityDto.getSkills());

            if (skills == null ||(skills.size() < updateOpportunityDto.getSkills().length))
            {
                log.error("Some skills are invalid in the request");
                return false;
            }
            opportunity.setJobTitleId(updateOpportunityDto.getJobTitleId());
            opportunity.setCreatorId(updateOpportunityDto.getCreatorId());
            opportunityRepository.save(opportunity);
            String id= updateOpportunityDto.getEntityId();
            OpportunitySkillMapping opportunitySkillMapping = opportunitySkillRepository.findByOpportunityId(id);
            opportunitySkillMapping.setSkillId(updateOpportunityDto.getSkills());
            opportunitySkillRepository.save(opportunitySkillMapping);
            return true;
        }
        catch (Exception e) {
            log.error("Something went wrong while updating employee.." + e);
            return false;
        }
    }

    public boolean deleteOpportunity(OpportunityDeleteDto opportunityDeleteDto) {
        Opportunity opportunity = opportunityRepository.findByEntityId(opportunityDeleteDto.getEntityId());
        if(opportunity == null)
            return false;
        OpportunitySkillMapping opportunitySkillMapping = opportunitySkillRepository.findByOpportunityId(opportunity.getEntityId());
        opportunityRepository.delete(opportunity);
        opportunitySkillRepository.delete(opportunitySkillMapping);
        return true;
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

}
