package com.wms.praise.controller;

import com.wms.praise.dto.AuthUserResponses;
import com.wms.praise.dto.EndorsementDeleteDto;
import com.wms.praise.dto.EndorsementDto;
import com.wms.praise.dto.PraiseDto;
import com.wms.praise.model.Endorsement;
import com.wms.praise.repository.EndorsementRepository;
import com.wms.praise.service.EndorsementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/endorsement")
public class EndorsementController {

    @Autowired
    EndorsementRepository endorsementRepository;

    @Autowired
    EndorsementService endorsementService;
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public boolean createEndorsement(@Valid @RequestBody EndorsementDto endorsementDto) {
        return endorsementService.createEndorsement(endorsementDto);
    }
    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public boolean deleteEndorsement(@Valid @RequestBody EndorsementDeleteDto endorsementDeleteDto)
    {
        return endorsementService.deleteEndorsement(endorsementDeleteDto);
    }
}
