package com.wms.recommedationservice.service;

import com.wms.recommedationservice.dto.JobTitleAndSkillResponseDto;
import com.wms.recommedationservice.dto.SkillJobTitleRequest;
import com.wms.recommedationservice.model.Skill;
import com.wms.recommedationservice.repository.SkillRepository;
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
public class SkillSearchService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public void addSkill(SkillJobTitleRequest skillRequest) {
        if (skillRequest == null) return;
        try {
            Skill skillToSave = Skill.builder()
                    .name(skillRequest.getName())
                    .externalCode(skillRequest.getExternalId())
                    .build();
            Optional<Skill> existingSkill = skillRepository.findById(skillToSave.getExternalCode());
            existingSkill.ifPresent(skill -> skillRepository.delete(skill));
            skillRepository.save(skillToSave);
        } catch (Exception e) {
            log.error("Something went wrong while storing Skill data to Elasticsearch" + e);
            throw new ValidationException("Something went wrong while saving Skill..." + e);
        }
    }

    public void reindexAllSkills() {
        List<JobTitleAndSkillResponseDto> skillsToReindex = Arrays.stream(getAllSkills()).toList();
        skillsToReindex.forEach(skill -> {
            try {
                addSkill(SkillJobTitleRequest.builder()
                        .name(skill.getName())
                        .externalId(skill.getId())
                        .build());
                log.info("Skill " + skill.getId() + " reindexed...");
            } catch (Exception e) {
                log.error("Something went wrong while reindexing " + skill.getId() + ", error: " + e);
            }
        });
        log.info("Skills reindex completed successfully...");
    }

    public List<JobTitleAndSkillResponseDto> searchSkills(String query) {
        Pageable pageable = PageRequest.of(0, 100);
        return mapToJobTitleAndSkillResponseDto(skillRepository.findByNameContaining(query, pageable).stream().toList());
    }

    private List<JobTitleAndSkillResponseDto> mapToJobTitleAndSkillResponseDto(List<Skill> skills) {
        return skills.stream().map(skill -> JobTitleAndSkillResponseDto.builder()
                .id(skill.getExternalCode())
                .externalCode(skill.getExternalCode())
                .name(skill.getName())
                .build()).toList();
    }

    private JobTitleAndSkillResponseDto[] getAllSkills() {
        return webClientBuilder.build()
                .get()
                .uri("http://LIGHTCAST-SERVICE/api/skills")
                .retrieve()
                .bodyToMono(JobTitleAndSkillResponseDto[].class)
                .block();
    }
}
