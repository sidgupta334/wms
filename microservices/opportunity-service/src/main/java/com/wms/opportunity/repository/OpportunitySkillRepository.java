package com.wms.opportunity.repository;

import com.wms.opportunity.model.Opportunity;
import com.wms.opportunity.model.OpportunitySkillMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunitySkillRepository extends JpaRepository<OpportunitySkillMapping, String> {


    List<OpportunitySkillMapping> findByOpportunity(Opportunity opportunity);

    void deleteAllByOpportunity(Opportunity opportunity);
}
