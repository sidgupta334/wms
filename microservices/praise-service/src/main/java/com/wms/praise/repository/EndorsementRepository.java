package com.wms.praise.repository;

import com.wms.praise.model.Endorsement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EndorsementRepository extends JpaRepository<Endorsement,String> {
    Endorsement findByEntityId(String entityId);
}
