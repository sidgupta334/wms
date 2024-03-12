package com.wms.praise.controller;

import com.wms.praise.dto.*;
import com.wms.praise.model.Endorsement;
import com.wms.praise.repository.EndorsementRepository;
import com.wms.praise.service.EndorsementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/endorsement")
public class EndorsementController {

    @Autowired
    EndorsementService endorsementService;
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public boolean createEndorsement(@Valid @RequestBody EndorsementDto endorsementDto) {
        return endorsementService.createEndorsement(endorsementDto);
    }
    @PostMapping("/unendorse")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> deleteEndorsement(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,@RequestBody EndorsementDeleteDto endorsementDeleteDto)
    {
        AuthUserResponses loggedInUser = endorsementService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin() && !Objects.equals(loggedInUser.getExternalId(), endorsementDeleteDto.getGiverId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        boolean result = endorsementService.deleteEndorsement(endorsementDeleteDto);
        if (result) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
    }

    @GetMapping("{profileId}")
    public ResponseEntity<?> getSkillEndorsementsByProfile(@PathVariable  String profileId) {
        List<JobTitleAndSkillResponseDto> response = endorsementService.getEndorsedSkillsByUser(profileId);
        return ResponseEntity.ok(response);
    }
}
