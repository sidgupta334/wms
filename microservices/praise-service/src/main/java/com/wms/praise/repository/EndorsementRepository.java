package com.wms.praise.repository;

import com.wms.praise.model.Endorsement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EndorsementRepository extends JpaRepository<Endorsement,String> {

    @Query("SELECT e from Endorsement e WHERE e.skillId = :skillId AND e.giverId = :giverId")
    Endorsement getBySkillAndGiver(String skillId, String giverId);

    List<Endorsement> findByReceiverId(String id);
}
