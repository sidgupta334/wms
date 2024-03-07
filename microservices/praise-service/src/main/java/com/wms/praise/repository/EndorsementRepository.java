package com.wms.praise.repository;

import com.wms.praise.model.Endorsement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EndorsementRepository extends JpaRepository<Endorsement,String> {
    Endorsement findByEntityId(String entityId);

    List<Endorsement> findByReceiverId(String id);
}
