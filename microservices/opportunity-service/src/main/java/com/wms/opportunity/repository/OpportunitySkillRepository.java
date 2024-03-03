package com.wms.opportunity.repository;

import com.wms.opportunity.model.OpportunitySkillMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunitySkillRepository extends JpaRepository<OpportunitySkillMapping, String> {


    List<OpportunitySkillMapping> findByOpportunityId(String entity);
}
