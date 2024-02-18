package com.wms.lightcastservice.controller;

import com.wms.lightcastservice.dto.JobTitleResponse;
import com.wms.lightcastservice.model.JobTitle;
import com.wms.lightcastservice.service.JobTitlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-titles")
public class JobTitleController {

    @Autowired
    private JobTitlesService jobTitlesService;

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public JobTitleResponse getJobTitleById(@PathVariable("id") String id) {
        return jobTitlesService.getJobTitleById(id);
    }

    @GetMapping("sync")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void syncJobTitles() {
        jobTitlesService.triggerJobTitlessSync();
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<JobTitleResponse> getAllJobTitles() {
        return jobTitlesService.getAllJobTitles();
    }
}
