package com.wms.praise.repository;

import com.wms.praise.model.Praise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PraiseRepository extends JpaRepository<Praise, String> {
}
