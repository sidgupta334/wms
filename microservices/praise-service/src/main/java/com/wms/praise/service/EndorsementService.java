package com.wms.praise.service;

import com.wms.praise.dto.EndorsementDeleteDto;
import com.wms.praise.dto.EndorsementDto;
import com.wms.praise.model.Endorsement;
import com.wms.praise.repository.EndorsementRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EndorsementService {
    @Autowired
    EndorsementRepository endorsementRepository;
    public boolean createEndorsement(EndorsementDto endorsementDto) {
        Endorsement endorsement = Endorsement.builder()
                .giverId(endorsementDto.getGiverId())
                .receiverId(endorsementDto.getReceiverId())
                .skillId(endorsementDto.getSkills())
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
}
