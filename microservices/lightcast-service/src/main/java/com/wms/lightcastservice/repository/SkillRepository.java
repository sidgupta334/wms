package com.wms.lightcastservice.repository;

import com.wms.lightcastservice.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, String> {
    public Skill findByExternalCode(String externalCode);
}
