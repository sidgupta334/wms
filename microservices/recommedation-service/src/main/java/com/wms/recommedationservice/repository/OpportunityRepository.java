package com.wms.recommedationservice.repository;

import com.wms.recommedationservice.model.Employee;
import com.wms.recommedationservice.model.Opportunity;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OpportunityRepository extends ElasticsearchRepository<Opportunity, String> {
    Optional<Opportunity> findByEntityId(String entityId);

    @Query("""
            {
              "bool": {
                "must": [
                  { "match": { "title": "?0" } }
                ]
              }
            }
            """)
    List<Opportunity> searchOpportunitiesByTitle(String title);

    @Query(value = """
            {
              "size": 100,
              "sort": [
                { "_script": {
                  "script": {
                    "lang": "painless",
                    "source": "doc['skills.externalCode'].size() * doc.score"
                  },
                  "order": "desc"
                }}
              ],
              "query": {
                "bool": {
                  "should": [
                    { "script": { "script": "doc['skills.externalCode'].contains(params.skillCode)" } },
                    { "script": { "script": "doc['skills.externalCode'].contains(params.skillCode)" } },
                    ...  ]
                  }
                }
              },
              "params": {
                "skillCode": { "type": "array", "value": :skillCodes }
              }
            }""")
    public List<Opportunity> suggestOpportunities(@Param("skillCodes") List<String> skillCodes);
}
