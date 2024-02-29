package com.wms.opportunity.controller;

import com.wms.opportunity.dto.AuthOpportunityResponse;
import com.wms.opportunity.dto.OpportunityDto;
import com.wms.opportunity.dto.OpportunityResponseDto;
import com.wms.opportunity.service.OpportunityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunity")
public class OpportunityController {
    @Autowired
    private OpportunityService opportunityService;

    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<OpportunityResponseDto> getAllOpportunities(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return opportunityService.getAllOpportunity();
    }
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean createOpportunity(@Valid @RequestBody OpportunityDto opportunityDto) {
        return opportunityService.createOpportunity(opportunityDto);
    }
}