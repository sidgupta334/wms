package com.wms.recommedationservice.service;

import com.wms.recommedationservice.dto.JobTitleAndSkillResponseDto;
import com.wms.recommedationservice.dto.SkillJobTitleRequest;
import com.wms.recommedationservice.model.JobTitle;
import com.wms.recommedationservice.repository.JobTitleRepository;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class JobTitleSearchService {

    @Autowired
    private JobTitleRepository jobTitleRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public void addJobTitle(SkillJobTitleRequest jobTitleRequest) {
        if (jobTitleRequest == null) return;
        try {
            JobTitle jobTitleToSave = JobTitle.builder()
                    .name(jobTitleRequest.getName())
                    .externalCode(jobTitleRequest.getExternalId())
                    .build();
            Optional<JobTitle> existingJobTitle = jobTitleRepository.findById(jobTitleToSave.getExternalCode());
            if (existingJobTitle.isPresent()) {
                jobTitleToSave.setExternalCode(existingJobTitle.get().getExternalCode());
                jobTitleToSave.setName(existingJobTitle.get().getName());
            }
            jobTitleRepository.save(jobTitleToSave);
        } catch (Exception e) {
            log.error("Something went wrong while storing Job Title data to Elasticsearch" + e);
            throw new ValidationException("Something went wrong while saving JobTitle..." + e);
        }
    }

    public void reindexAllJobTitles() {
        List<JobTitleAndSkillResponseDto> jobTitlesToReindex = Arrays.stream(getAllJobTitles()).toList();
        jobTitlesToReindex.forEach(jobTitle -> {
            try {
                addJobTitle(SkillJobTitleRequest.builder()
                        .name(jobTitle.getName())
                        .externalId(jobTitle.getId())
                        .build());
                log.info("Job Title " + jobTitle.getId() + " reindexed...");
            } catch (Exception e) {
                log.error("Something went wrong while reindexing " + jobTitle.getId() + ", error: " + e);
            }
        });
        log.info("Job Titles reindex completed successfully...");
    }

    public List<JobTitleAndSkillResponseDto> searchJobTitles(String query) {
        Pageable pageable = PageRequest.of(0, 100);
        return mapToJobTitleAndSkillResponseDto(jobTitleRepository.findByNameContaining(query, pageable).stream().toList());
    }

    private List<JobTitleAndSkillResponseDto> mapToJobTitleAndSkillResponseDto(List<JobTitle> jobTitles) {
        return jobTitles.stream().map(skill -> JobTitleAndSkillResponseDto.builder()
                .id(skill.getExternalCode())
                .externalCode(skill.getExternalCode())
                .name(skill.getName())
                .build()).toList();
    }

    private JobTitleAndSkillResponseDto[] getAllJobTitles() {
        return webClientBuilder.build()
                .get()
                .uri("http://LIGHTCAST-SERVICE/api/job-titles")
                .retrieve()
                .bodyToMono(JobTitleAndSkillResponseDto[].class)
                .block();
    }
}
