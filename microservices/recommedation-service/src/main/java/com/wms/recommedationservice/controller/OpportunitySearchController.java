package com.wms.recommedationservice.controller;

import com.wms.recommedationservice.dto.AuthUserResponse;
import com.wms.recommedationservice.dto.OpportunityResponseDto;
import com.wms.recommedationservice.service.AuthService;
import com.wms.recommedationservice.service.OpportunitySearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search/opportunity")
public class OpportunitySearchController {

    @Autowired
    private OpportunitySearchService opportunitySearchService;

    @Autowired
    private AuthService authService;

    @GetMapping("index/{entityId}")
    public String reindexOpportunity(@PathVariable String entityId) {
        opportunitySearchService.reindexOpportunity(entityId);
        return "Success";
    }

    @GetMapping("search/{title}")
    public ResponseEntity<?> searchOpportunitiesByTitle(@PathVariable String title) {
        return ResponseEntity.ok(opportunitySearchService.searchOpportunitiesByTitle(title));
    }

    @GetMapping("suggest/{externalId}")
    public ResponseEntity<?> suggestOpportunities(@PathVariable String externalId) {
        return ResponseEntity.ok(opportunitySearchService.suggestOpportunities(externalId));
    }

    @DeleteMapping("{entityId}")
    public String deleteOpportunity(@PathVariable String entityId) {
        opportunitySearchService.removeOpportunityIndex(entityId);
        return "Success";
    }

    @GetMapping("reindex")
    public ResponseEntity<String> reindexOpportunities(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        AuthUserResponse loggedInUser = authService.getLoggedInUser(token);
        if (!loggedInUser.isAdmin()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is Unauthorized");
        }
        Thread thread = new Thread(() -> {
            opportunitySearchService.reindexAllOpportunities();
        });
        thread.start();
        return ResponseEntity.ok("Opportunities reindex started...");
    }
}
