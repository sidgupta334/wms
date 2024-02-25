package com.wms.recommedationservice.repository;

import com.wms.recommedationservice.model.Skill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends ElasticsearchRepository<Skill, String> {

    Page<Skill> findByNameContaining(String query, Pageable pageable);
}
