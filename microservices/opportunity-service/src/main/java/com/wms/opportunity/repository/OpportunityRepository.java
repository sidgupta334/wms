package com.wms.opportunity.repository;

import com.wms.opportunity.dto.OpportunityResponseDto;
import com.wms.opportunity.model.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity,String> {

    List<Opportunity> findByJobTitleId(String job_title_id);
}
