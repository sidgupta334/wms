package com.wms.praise.service;

import com.wms.praise.dto.*;
import com.wms.praise.model.Endorsement;
import com.wms.praise.repository.EndorsementRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class  EndorsementService {
    @Autowired
    EndorsementRepository endorsementRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;
    public boolean createEndorsement(EndorsementDto endorsementDto) {
        Endorsement endorsement = Endorsement.builder()
                .giverId(endorsementDto.getGiverId())
                .receiverId(endorsementDto.getReceiverId())
                .skillId(endorsementDto.getSkills())
                .timestamp(new Date())
                .build();
        try{
            endorsementRepository.save(endorsement);
            return true;
        }catch (Exception e) {
            log.error("Something went wrong while creating endorsement..." + e);
            return false;
        }
    }

    public boolean deleteEndorsement(EndorsementDeleteDto endorsementDeleteDto) {
        Endorsement endorsement = endorsementRepository.findByEntityId(endorsementDeleteDto.getEntityId());
        if(endorsement == null)
            return false;
        endorsementRepository.delete(endorsement);
        return true;
    }

    public List<JobTitleAndSkillResponseDto> getEndorsedSkillsByUser(String profileId) {
        List<Endorsement> endorsements = endorsementRepository.findByReceiverId(profileId);
        List<String> skillIds = endorsements.stream().map(Endorsement::getSkillId).toList();
        return getSkillsFromIds(skillIds.toArray(new String[0]));
    }

    public AuthUserResponses getLoggedInUser(String token)
    {
        return webClientBuilder.build()
                .get()
                .uri("http://AUTH-SERVICE/api/auth/extract/" + token)
                .retrieve()
                .bodyToMono(AuthUserResponses.class)
                .block();
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
