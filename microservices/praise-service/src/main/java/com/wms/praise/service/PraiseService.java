package com.wms.praise.service;

import com.wms.praise.config.WebClientConfig;
import com.wms.praise.dto.PraiseDto;
import com.wms.praise.dto.PraiseResponseDto;
import com.wms.praise.model.Praise;
import com.wms.praise.repository.PraiseRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class PraiseService {
    @Autowired
    private PraiseRepository praiseRepository;

    @Autowired
    private WebClientConfig webClientConfig;
    @Transactional
    public boolean createPraise(PraiseDto praiseDto) {
        Praise praise = new Praise().builder()
                .title(praiseDto.getTitle())
                .description(praiseDto.getDescription())
                .giver_id(praiseDto.getGiver_id())
                .receiver_id(praiseDto.getReceiver_id())
                .timestamp(new Date())
                .build();

        try {
            praiseRepository.save(praise);
            log.info("Praise with giver Id: " + praiseDto.getGiver_id()+"and receiver_id "+praiseDto.getReceiver_id() + " saved successfully...");
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
                .giver_id(praise.getGiver_id())
                .receiver_id(praise.getReceiver_id())
                .build();
    }
}
