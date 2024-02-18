package com.wms.lightcastservice.service;

import com.wms.lightcastservice.dto.EmsiApiResponse;
import com.wms.lightcastservice.dto.EmsiSkillResponse;
import com.wms.lightcastservice.model.Skill;
import com.wms.lightcastservice.repository.SkillRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SkillsSyncService {

    @Autowired
    private WebClient.Builder webClientBuilder;
    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private LightcastAuthService lightcastAuthService;

    @Value("${app.lightcast.baseUrl}")
    private String baseUrl;

    @Value("${app.lightcast.skillsUrl}")
    private String skillsUrl;

    @Autowired
    private RedisTemplate<String, Skill> redisTemplate;


    private final String SKILL_KEY = "skill_";

    public void syncSkills() {
        log.info("EMSI Skills sync started...");
        try {
        String authToken = lightcastAuthService.getAuthToken();
            EmsiApiResponse response = webClientBuilder.build().get()
                .uri(baseUrl + skillsUrl)
                .header("Authorization", authToken)
                .retrieve()
                .bodyToMono(EmsiApiResponse.class)
                .block();
            if (response == null) return;
            List<EmsiSkillResponse> emsiSkills = response.getData();
        List<EmsiSkillResponse> skillsToSave = filterNewSkills(emsiSkills);
        skillsToSave.forEach(this::saveSkill);
        log.info("EMSI Skills sync completed successfully....");
        } catch (Exception e) {
            log.error("Something went wrong while syncing skills...", e.fillInStackTrace());
        }
    }

    private void saveSkill(EmsiSkillResponse skillData) {
        Skill skill = Skill.builder()
                .name(skillData.getName())
                .externalCode(skillData.getId())
                .timestamp(new Date())
                .build();

        skillRepository.save(skill);
        redisTemplate.opsForValue().set(SKILL_KEY + skill.getExternalCode(), skill);
        log.info("Skill with id: " + skillData.getId() + " saved successfully...");
    }

    public List<EmsiSkillResponse> filterNewSkills(List<EmsiSkillResponse> skillsToSave) {
        List<Skill> existingSkills = getAllExistingSkills();
        Set<String> externalCodeSet = existingSkills.stream().map(Skill::getExternalCode).collect(Collectors.toSet());
        return skillsToSave.stream().filter(skill -> !externalCodeSet.contains(skill.getId())).toList();
    }

    public List<Skill> getAllExistingSkills() {
        return skillRepository.findAll();
    }
}
