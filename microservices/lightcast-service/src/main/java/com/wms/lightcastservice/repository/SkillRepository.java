package com.wms.lightcastservice.repository;

import com.wms.lightcastservice.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, String> {
    public Skill findByExternalCode(String externalCode);
<<<<<<< HEAD
    public List<Skill> findAllByExternalCode(String[] externalCode);

=======

    @Query("SELECT s from Skill s WHERE s.externalCode IN (:externalCodes)")
    public List<Skill> findSkillsByExternalCode(@Param("externalCodes") List<String> externalCodes);
>>>>>>> ba48c13eace8f77280c73d34af6c3e8d2ce8f173
}
