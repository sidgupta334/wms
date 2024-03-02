package com.wms.opportunity.repository;

import com.wms.opportunity.model.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity,String> {

    Opportunity findByEntityId(String entityId);
    List<Opportunity> findByJobTitleId(String job_title_id);

    Opportunity findByJobTitleIdAndCreatorId(String jobTitleId, String creatorId);
}
