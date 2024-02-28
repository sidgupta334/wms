package com.wms.opportunity.service;

import com.wms.opportunity.config.WebClientConfig;
import com.wms.opportunity.dto.AuthOpportunityResponse;
import com.wms.opportunity.dto.OpportunityDto;
import com.wms.opportunity.dto.OpportunityResponseDto;
import com.wms.opportunity.model.Opportunity;
import com.wms.opportunity.repository.OpportunityRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class OpportunityService {

    @Autowired
    private OpportunityRepository opportunityRepository;

    @Autowired
    private WebClientConfig webClientConfig;

    @Autowired
    private WebClient.Builder webClientBuilder;
    @Transactional
    public boolean createOpportunity(OpportunityDto opportunityDto) {
        Opportunity opportunity = new Opportunity().builder()
                .title(opportunityDto.getTitle())
                .description(opportunityDto.getDescription())
                .job_title_id(opportunityDto.getJob_title_id())
                .creator_id(opportunityDto.getCreator_id())
                .timestamp(new Date())
                .build();

        try {
            opportunityRepository.save(opportunity);
            log.info("Opportunity with job title Id: " + opportunityDto.getJob_title_id()+"and creator id"+opportunityDto.getCreator_id() + " saved successfully...");
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
        return OpportunityResponseDto.builder()
                .entityId(opportunity.getEntityId())
                .title(opportunity.getTitle())
                .description(opportunity.getDescription())
                .job_title_id(opportunity.getJob_title_id())
                .creator_id(opportunity.getCreator_id())
                .build();
    }

    public AuthOpportunityResponse getLoggedInUser(String token)
    {
        return webClientBuilder.build()
                .get()
                .uri("http://AUTH-SERVICE/api/auth/extract/" + token)
                .retrieve()
                .bodyToMono(AuthOpportunityResponse.class)
                .block();
    }
}
