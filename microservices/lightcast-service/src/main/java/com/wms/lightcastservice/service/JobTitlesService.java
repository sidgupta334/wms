package com.wms.lightcastservice.service;

import com.wms.lightcastservice.dto.JobTitleResponse;
import com.wms.lightcastservice.model.JobTitle;
import com.wms.lightcastservice.model.Skill;
import com.wms.lightcastservice.repository.JobTitleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class JobTitlesService {

    @Autowired
    private JobTitleRepository jobTitleRepository;

    @Autowired
    private JobTitlesSyncService jobTitlesSyncService;

    @Autowired
    private RedisTemplate<String, JobTitle> redisTemplate;

    private final String JOB_TITLE_KEY = "jobTitle_";

    public void triggerJobTitlessSync() {
        Thread thread = new Thread(() -> {
            jobTitlesSyncService.syncJobTitles();
        });
        thread.start();
    }

    public List<JobTitleResponse> getAllJobTitles() {
        List<JobTitle> jobTitles = jobTitleRepository.findAll();
        return jobTitles.stream().map(this::mapToJobTitleResponse).toList();
    }

    public JobTitleResponse getJobTitleByExternalId(String externalCode) {
        var key = JOB_TITLE_KEY + externalCode;
        final ValueOperations<String, JobTitle> operations = redisTemplate.opsForValue();
        final boolean hasKey = Boolean.TRUE.equals(redisTemplate.hasKey(key));
        if (hasKey) {
            final JobTitle jobTitle = operations.get(key);
            log.info("Fetching from Cache..." + key);
            return mapToJobTitleResponse(jobTitle);
        }
        JobTitle jobTitle = jobTitleRepository.findByExternalCode(externalCode);
        jobTitlesSyncService.cacheJobTitle(jobTitle);
        return mapToJobTitleResponse(jobTitleRepository.findByExternalCode(externalCode));
    }

    private JobTitleResponse mapToJobTitleResponse(JobTitle jobTitle) {
        if (jobTitle == null) return null;
        return JobTitleResponse.builder()
                .name(jobTitle.getName())
                .id(jobTitle.getExternalCode())
                .build();
    }
}
