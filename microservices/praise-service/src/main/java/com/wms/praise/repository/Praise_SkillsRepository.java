package com.wms.praise.repository;

import com.wms.praise.model.PraisedSkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Praise_SkillsRepository extends JpaRepository<PraisedSkills, String> {
}
