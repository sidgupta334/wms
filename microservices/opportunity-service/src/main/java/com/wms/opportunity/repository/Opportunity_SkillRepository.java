package com.wms.opportunity.repository;

import com.wms.opportunity.model.Opportunity_Skill_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Opportunity_SkillRepository extends JpaRepository<Opportunity_Skill_Mapping, String> {


}
