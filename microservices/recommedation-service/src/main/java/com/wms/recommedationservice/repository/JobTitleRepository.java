package com.wms.recommedationservice.repository;

import com.wms.recommedationservice.model.JobTitle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobTitleRepository extends ElasticsearchRepository<JobTitle, String> {

    @Query("""
            {
              "bool": {
                "must": [
                  { "match": { "name": "?0" } }
                ]
              }
            }
            """)
    Page<JobTitle> searchByName(String name, Pageable pageable);
}
