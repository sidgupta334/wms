package com.wms.lightcastservice.service;

import com.wms.lightcastservice.dto.SkillResponse;
import com.wms.lightcastservice.model.Skill;
import com.wms.lightcastservice.repository.SkillRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class SkillsService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private RedisTemplate<String, Skill> redisTemplate;

    @Autowired
    private SkillsSyncService skillsSyncService;

    private final String SKILL_KEY = "skill_";

    public void triggerSkillsSync() {
        Thread thread = new Thread(() -> {
            skillsSyncService.syncSkills();
        });
        thread.start();
    }

    public List<SkillResponse> getAllSkills() {
        final ValueOperations<String, Skill> operations = redisTemplate.opsForValue();
        Set<String> keys =  redisTemplate.keys(SKILL_KEY + "*");
        List<Skill> skills = operations.multiGet(keys);
        if (skills == null || skills.isEmpty()) {
            skills = skillRepository.findAll();
        }
        return skills.stream().map(this::mapToSkillResponse).toList();
    }

    public SkillResponse getSkillByExternalId(String externalId) {
        var key = SKILL_KEY + externalId;
        final ValueOperations<String, Skill> operations = redisTemplate.opsForValue();
        final boolean hasKey = Boolean.TRUE.equals(redisTemplate.hasKey(key));
        if (hasKey) {
            final Skill skill = operations.get(key);
            log.info("Fetching from Cache..." + key);
            return mapToSkillResponse(skill);
        }
        return mapToSkillResponse(skillRepository.findByExternalCode(externalId));
    }

    private SkillResponse mapToSkillResponse(Skill skill) {
        if (skill == null) return null;
        return SkillResponse.builder()
                .name(skill.getName())
                .externalCode(skill.getExternalCode())
                .build();
    }
}
