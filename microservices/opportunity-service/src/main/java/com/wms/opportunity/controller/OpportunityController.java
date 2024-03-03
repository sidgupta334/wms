package com.wms.opportunity.controller;

import com.wms.opportunity.dto.*;
import com.wms.opportunity.repository.OpportunityRepository;
import com.wms.opportunity.service.OpportunityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/opportunity")
public class OpportunityController {
    @Autowired
    private OpportunityService opportunityService;
    @Autowired
    private OpportunityRepository opportunityRepository;

    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public List<OpportunityResponseDto> getAllOpportunities() {
        return opportunityService.getAllOpportunity();
    }

    @GetMapping("/get/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<OpportunityResponseDto> getOpportunity(@PathVariable String id) {
        return opportunityService.getOpportunityById(id);
    }
    @PutMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> updateOpportunity(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody UpdateOpportunityDto updateOpportunityDto) {
        AuthUserResponse loggedInUser = opportunityService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin() && !Objects.equals(loggedInUser.getExternalId(), updateOpportunityDto.getCreatorId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        boolean result = opportunityService.updateOpportunity(updateOpportunityDto);
        if (result) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> deleteEndorsement(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable String id)
    {
        AuthUserResponse loggedInUser = opportunityService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        boolean result = opportunityService.deleteOpportunity(id, loggedInUser);
        if (result) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
    }
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createOpportunity(@Valid @RequestBody OpportunityDto opportunityDto) {
        boolean result = opportunityService.createOpportunity(opportunityDto);
        if (result) {
            return ResponseEntity.ok("Opportunity Created Successfully");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
    }
}