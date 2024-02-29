package com.wms.opportunity.repository;

import com.wms.opportunity.model.OpportunitySkillMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Opportunity_SkillRepository extends JpaRepository<OpportunitySkillMapping, String> {


}
