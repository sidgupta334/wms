package com.wms.praise.controller;

import com.wms.praise.dto.AuthUserResponses;
import com.wms.praise.dto.PraiseDto;
import com.wms.praise.dto.PraiseResponseDto;
import com.wms.praise.dto.PraisedSkillsResponse;
import com.wms.praise.model.PraisedSkills;
import com.wms.praise.service.PraiseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public boolean createPraise(@Valid @RequestBody PraiseDto praiseDto) {
        return praiseService.createPraise(praiseDto);
    }
}
