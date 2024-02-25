package com.wms.recommedationservice.controller;

import com.wms.recommedationservice.dto.SkillJobTitleRequest;
import com.wms.recommedationservice.service.SkillSearchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search/skills")
public class SkillSearchController {

    @Autowired
    private SkillSearchService skillSearchService;

    @PostMapping("sync")
    public String syncSkills(@Valid @RequestBody SkillJobTitleRequest skillRequest) {
        skillSearchService.addSkill(skillRequest);
        return "Success";
    }

    @GetMapping("")
    public ResponseEntity<?> searchSkills(@RequestParam String term) {
        return ResponseEntity.ok(skillSearchService.searchSkills(term));
    }
}
