package com.wms.praise.controller;

import com.wms.praise.dto.*;
import com.wms.praise.model.PraisedSkills;
import com.wms.praise.service.PraiseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/praise")
public class PraiseController {
    @Autowired
    private PraiseService praiseService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?>  getAllPraises(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        AuthUserResponses loggedInUser = praiseService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        return ResponseEntity.ok(praiseService.getAllPraise());
    }

    @PutMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> updatePraise(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody UpdatePraiseDto updatePraiseDto) {
        AuthUserResponses loggedInUser = praiseService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin() && !Objects.equals(loggedInUser.getExternalId(), updatePraiseDto.getGiverId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        boolean result = praiseService.updatePraisedSkills(updatePraiseDto);
        if (result) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
    }
/*
    @GetMapping("get/praisedSkills")
    @ResponseStatus(HttpStatus.OK)
    public List<PraisedSkillsResponse>  getPraisedSkills() {
        return praiseService.getPraisedSkills();
    }

    @GetMapping("get/praisedSkills/{praiseId}")
    @ResponseStatus(HttpStatus.OK)
    public PraisedSkills getPraisedSkills(@PathVariable String praiseId) {
        return praiseService.getAllSkills(praiseId);
    }
*/
    @GetMapping("/get/receiver/{receiverId}")
    @ResponseStatus(HttpStatus.OK)
    public List<PraiseResponseDto>  getReceiverPraises(@PathVariable String receiverId) {
        return praiseService.getReceiverPraise(receiverId);
    }

    @GetMapping("/get/giver/{giverId}")
    @ResponseStatus(HttpStatus.OK)
    public List<PraiseResponseDto>  getGiverPraises(@PathVariable String giverId) {
        return praiseService.getGiverPraise(giverId);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createPraise(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody PraiseDto praiseDto) {
        AuthUserResponses loggedInUser = praiseService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin() && !Objects.equals(loggedInUser.getExternalId(), praiseDto.getGiverId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        boolean result = praiseService.createPraise(praiseDto);
        if (result) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> deleteEndorsement(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody PraiseDeleteDto praiseDeleteDto)
    {
        AuthUserResponses loggedInUser = praiseService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin() && !Objects.equals(loggedInUser.getExternalId(), praiseDeleteDto.getGiverId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        boolean result = praiseService.deletePraise(praiseDeleteDto);
        if (result) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
    }
}
