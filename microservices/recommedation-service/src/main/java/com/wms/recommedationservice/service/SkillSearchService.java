package com.wms.recommedationservice.service;

import com.wms.recommedationservice.dto.SkillJobTitleRequest;
import com.wms.recommedationservice.model.Skill;
import com.wms.recommedationservice.repository.SkillRepository;
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
public class SkillSearchService {

    @Autowired
    private SkillRepository skillRepository;

    public void addSkill(SkillJobTitleRequest skillRequest) {
        if (skillRequest == null) return;
        try {
            Skill skillToSave = Skill.builder()
                    .name(skillRequest.getName())
                    .externalCode(skillRequest.getExternalId())
                    .build();
            Optional<Skill> existingSkill = skillRepository.findById(skillToSave.getExternalCode());
            if (existingSkill.isPresent()) {
                return;
            }
            skillRepository.save(skillToSave);
        } catch (Exception e) {
            log.error("Something went wrong while storing Skills data to Elasticsearch" + e);
            throw new ValidationException("Something went wrong while saving Skill..." + e);
        }
    }

    public List<Skill> searchSkills(String query) {
        Pageable pageable = PageRequest.of(0, 100);
        return skillRepository.findByNameContaining(query, pageable).stream().toList();
    }
}
