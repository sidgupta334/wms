package com.wms.recommedationservice.service;

import com.wms.recommedationservice.dto.SkillJobTitleRequest;
import com.wms.recommedationservice.model.JobTitle;
import com.wms.recommedationservice.repository.JobTitleRepository;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class JobTitleSearchService {

    @Autowired
    private JobTitleRepository jobTitleRepository;

    public void addJobTitle(SkillJobTitleRequest jobTitleRequest) {
        if (jobTitleRequest == null) return;
        try {
            JobTitle jobTitleToSave = JobTitle.builder()
                    .name(jobTitleRequest.getName())
                    .externalCode(jobTitleRequest.getExternalId())
                    .build();
            Optional<JobTitle> existingJobTitle = jobTitleRepository.findById(jobTitleToSave.getExternalCode());
            if (existingJobTitle.isPresent()) {
                return;
            }
            jobTitleRepository.save(jobTitleToSave);
        } catch (Exception e) {
            log.error("Something went wrong while storing Job Title data to Elasticsearch" + e);
            throw new ValidationException("Something went wrong while saving JobTitle..." + e);
        }
    }

    public List<JobTitle> searchJobTitles(String query) {
        Pageable pageable = PageRequest.of(0, 100);
        return jobTitleRepository.findByNameContaining(query, pageable).stream().toList();
    }
}
