package com.wms.praise.service;

import com.wms.praise.config.WebClientConfig;
import com.wms.praise.dto.*;
import com.wms.praise.model.Praise;
import com.wms.praise.model.PraisedSkills;
import com.wms.praise.repository.PraiseRepository;
import com.wms.praise.repository.PraiseSkillsRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class PraiseService {
    @Autowired
    private PraiseRepository praiseRepository;

    @Autowired
    private PraiseSkillsRepository praiseSkillsRepository;

    @Autowired
    private WebClientConfig webClientConfig;

    @Autowired
    private WebClient.Builder webClientBuilder;
    @Transactional
    public boolean createPraise(PraiseDto praiseDto) {

        Praise praise = Praise.builder()
                .title(praiseDto.getTitle())
                .description(praiseDto.getDescription())
                .giverId(praiseDto.getGiverId())
                .receiverId(praiseDto.getReceiverId())
                .timestamp(new Date())
                .build();
        praiseRepository.save(praise);
        PraisedSkills praisedSkills = PraisedSkills.builder()
                .praiseId(praise.getEntityId())
                .skillId(praiseDto.getSkills())
                .build();
        praiseSkillsRepository.save(praisedSkills);
        try {
            log.info("Praise with giver Id: " + praiseDto.getGiverId()+"and receiver_id "+praiseDto.getReceiverId() + " saved successfully...");
            return true;
        } catch (Exception e) {
            log.error("Something went wrong while creating praise..." + e);
            return false;
        }

    }

    public List<PraiseResponseDto> getAllPraise() {
        List<Praise> praises = praiseRepository.findAll();
        return praises.stream().map(this::mapToPraiseResponseDto).toList();
    }

    private PraiseResponseDto mapToPraiseResponseDto(Praise praise) {
        String entity = praise.getEntityId();
        PraisedSkills praisedSkills = getAllSkills(entity);
        return PraiseResponseDto.builder()
                .entityId(entity)
                .title(praise.getTitle())
                .description(praise.getDescription())
                .giverId(praise.getGiverId())
                .receiverId(praise.getReceiverId())
                .skillsList(praisedSkills.getSkillId())
                .build();
    }
    public PraisedSkills getAllSkills(String praiseId)
    {
       return praiseSkillsRepository.findByPraiseId(praiseId);
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

    public List<PraiseResponseDto> getReceiverPraise(String receiver) {
        List<Praise> praises = praiseRepository.findByReceiverId(receiver);
        return praises.stream().map(this::mapToPraiseResponseDto).toList();
    }

    public List<PraiseResponseDto> getGiverPraise(String giver) {
        List<Praise> praises = praiseRepository.findByGiverId(giver);
        return praises.stream().map(this::mapToPraiseResponseDto).toList();
    }


    public List<PraisedSkillsResponse> getPraisedSkills() {
        List<PraisedSkills> praisedSkillsResponses = praiseSkillsRepository.findAll();
        return praisedSkillsResponses.stream().map(this::mapToPraisedSkillsResponse).toList();
    }

    private PraisedSkillsResponse mapToPraisedSkillsResponse(PraisedSkills praisedSkills) {
        return PraisedSkillsResponse.builder()
                .praiseId(praisedSkills.getPraiseId())
                .skillId(praisedSkills.getSkillId())
                .build();
    }
}
