package com.wms.lightcastservice.controller;

import com.wms.lightcastservice.dto.SkillResponse;
import com.wms.lightcastservice.service.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillsService skillsService;

    @GetMapping("sync")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void syncSkills() {
        skillsService.triggerSkillsSync();
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<SkillResponse> getAllSkills() {
        return skillsService.getAllSkills();
    }
}
