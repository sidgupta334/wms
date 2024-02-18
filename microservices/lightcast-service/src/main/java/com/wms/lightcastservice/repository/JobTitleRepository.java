package com.wms.lightcastservice.repository;

import com.wms.lightcastservice.model.JobTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobTitleRepository extends JpaRepository<JobTitle, String> {
    public JobTitle findByExternalCode(String externalCode);
}
