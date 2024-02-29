package com.wms.praise.service;

import com.wms.praise.config.WebClientConfig;
import com.wms.praise.dto.AuthUserResponse;
import com.wms.praise.dto.PraiseDto;
import com.wms.praise.dto.PraiseResponseDto;
import com.wms.praise.model.Praise;
import com.wms.praise.repository.PraiseRepository;
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

        try {
            praiseRepository.save(praise);
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
        return PraiseResponseDto.builder()
                .entityId(praise.getEntityId())
                .title(praise.getTitle())
                .description(praise.getDescription())
                .giverId(praise.getGiverId())
                .receiverId(praise.getReceiverId())
                .build();
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

    public List<PraiseResponseDto> getReceiverPraise(String receiver) {
        List<Praise> praises = praiseRepository.findByReceiverId(receiver);
        return praises.stream().map(this::mapToPraiseResponseDto).toList();
    }

    public List<PraiseResponseDto> getGiverPraise(String giver) {
        List<Praise> praises = praiseRepository.findByGiverId(giver);
        return praises.stream().map(this::mapToPraiseResponseDto).toList();
    }
}
