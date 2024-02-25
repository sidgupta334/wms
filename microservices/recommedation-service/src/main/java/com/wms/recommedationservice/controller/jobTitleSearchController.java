package com.wms.recommedationservice.controller;

import com.wms.recommedationservice.dto.SkillJobTitleRequest;
import com.wms.recommedationservice.service.JobTitleSearchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search/job-titles")
public class jobTitleSearchController {

    @Autowired
    private JobTitleSearchService jobTitleSearchService;

    @PostMapping("sync")
    public String syncJobTitle(@Valid @RequestBody SkillJobTitleRequest jobTitleRequest) {
        jobTitleSearchService.addJobTitle(jobTitleRequest);
        return "Success";
    }

    @GetMapping("")
    public ResponseEntity<?> searchSkills(@RequestParam String term) {
        return ResponseEntity.ok(jobTitleSearchService.searchJobTitles(term));
    }
}
