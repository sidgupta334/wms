package com.wms.recommedationservice.controller;

import com.wms.recommedationservice.dto.AuthUserResponse;
import com.wms.recommedationservice.dto.SkillJobTitleRequest;
import com.wms.recommedationservice.service.AuthService;
import com.wms.recommedationservice.service.JobTitleSearchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search/job-titles")
public class JobTitleSearchController {

    @Autowired
    private JobTitleSearchService jobTitleSearchService;

    @Autowired
    private AuthService authService;

    @PostMapping("sync")
    public String syncJobTitle(@Valid @RequestBody SkillJobTitleRequest jobTitleRequest) {
        jobTitleSearchService.addJobTitle(jobTitleRequest);
        return "Success";
    }

    @GetMapping("")
    public ResponseEntity<?> searchSkills(@RequestParam String term) {
        return ResponseEntity.ok(jobTitleSearchService.searchJobTitles(term));
    }

    @GetMapping("/reindex")
    public ResponseEntity<String> reindexSkills(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        AuthUserResponse loggedInUser = authService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        Thread thread = new Thread(() -> {
            jobTitleSearchService.reindexAllJobTitles();
        });
        thread.start();
        return ResponseEntity.ok("Job Title reindex started...");
    }
}
