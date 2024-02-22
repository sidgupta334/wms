package com.wms.lightcastservice.service;

import com.wms.lightcastservice.dto.EmsiApiResponse;
import com.wms.lightcastservice.dto.EmsiSkillResponse;
import com.wms.lightcastservice.model.JobTitle;
import com.wms.lightcastservice.model.Skill;
import com.wms.lightcastservice.repository.JobTitleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class JobTitlesSyncService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private JobTitleRepository jobTitleRepository;

    @Autowired
    private LightcastAuthService lightcastAuthService;

    @Value("${app.lightcast.baseUrl}")
    private String baseUrl;

    @Value("${app.lightcast.jobTitlesUrl}")
    private String jobTitlesUrl;

    @Autowired
    private RedisTemplate<String, JobTitle> redisTemplate;

    private final String JOB_TITLE_KEY = "jobTitle_";

    @Scheduled(cron = "0 45 23 * * *")
    public void syncJobTitles() {
        log.info("EMSI Job Titles sync started...");try {
            String authToken = lightcastAuthService.getAuthToken();
            EmsiApiResponse response = webClientBuilder.build().get()
                    .uri(baseUrl + jobTitlesUrl)
                    .header("Authorization", authToken)
                    .retrieve()
                    .bodyToMono(EmsiApiResponse.class)
                    .block();
            if (response == null) return;
            List<EmsiSkillResponse> emsiJobTitles = response.getData();
            List<EmsiSkillResponse> jobTitlesToSave = filterNewJobTitles(emsiJobTitles);
            jobTitlesToSave.forEach(this::saveJobTitle);
            log.info("EMSI Job Title sync completed successfully....");
        } catch (Exception e) {
            log.error("Something went wrong while syncing Job Titles...", e.fillInStackTrace());
        }
    }

    private void saveJobTitle(EmsiSkillResponse jobTitleData) {
        JobTitle jobTitle = JobTitle.builder()
                .name(jobTitleData.getName())
                .externalCode(jobTitleData.getId())
                .timestamp(new Date())
                .build();

        jobTitleRepository.save(jobTitle);
        redisTemplate.opsForValue().set(JOB_TITLE_KEY + jobTitle.getExternalCode(), jobTitle);
        log.info("Job Title with id: " + jobTitleData.getId() + " saved successfully...");
    }

    public List<EmsiSkillResponse> filterNewJobTitles(List<EmsiSkillResponse> jobTitlesToSave) {
        List<JobTitle> existingJobTitles = jobTitleRepository.findAll();
        Set<String> externalCodeSet = existingJobTitles.stream().map(JobTitle::getExternalCode).collect(Collectors.toSet());
        return jobTitlesToSave.stream().filter(jobTitle -> !externalCodeSet.contains(jobTitle.getId())).toList();
    }
}
