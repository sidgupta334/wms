package com.wms.praise.repository;

import com.wms.praise.model.Praise;
import com.wms.praise.model.PraisedSkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PraiseSkillsRepository extends JpaRepository<PraisedSkills, String> {
    List<PraisedSkills> findByPraise(Praise praise);

    void deleteAllByPraise(Praise praise);
}
