package com.wms.praise.repository;

import com.wms.praise.model.Praised_Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Praise_SkillsRepository extends JpaRepository<Praised_Skills, String> {
}
