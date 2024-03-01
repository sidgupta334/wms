package com.wms.opportunity.repository;

import com.wms.opportunity.model.OpportunitySkillMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpportunitySkillRepository extends JpaRepository<OpportunitySkillMapping, String> {


    OpportunitySkillMapping findByOpportunityId(String entity);
}
