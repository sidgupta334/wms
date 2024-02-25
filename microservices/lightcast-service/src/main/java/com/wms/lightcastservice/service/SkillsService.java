package com.wms.lightcastservice.service;

import com.wms.lightcastservice.dto.SkillResponse;
import com.wms.lightcastservice.model.Skill;
import com.wms.lightcastservice.repository.SkillRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.*;

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
        List<Skill> skills = skillRepository.findAll();
        return skills.stream().map(this::mapToSkillResponse).toList();
    }

    public List<SkillResponse> getSkillsByExternalId(String[] externalIds) {
        var keys = Arrays.stream(externalIds).map(externalId -> SKILL_KEY + externalId).toList();
        final ValueOperations<String, Skill> operations = redisTemplate.opsForValue();
        List<Skill> skills = operations.multiGet(keys);
        if (skills == null || skills.isEmpty()) {
            return skillRepository.findAllByExternalCode(externalIds).stream().map(this::mapToSkillResponse).toList();
        }
        return skills.stream().filter(Objects::nonNull).map(this::mapToSkillResponse).toList();
    }

    private SkillResponse mapToSkillResponse(Skill skill) {
        if (skill == null) return null;
        return SkillResponse.builder()
                .name(skill.getName())
                .id(skill.getExternalCode())
                .build();
    }
}
