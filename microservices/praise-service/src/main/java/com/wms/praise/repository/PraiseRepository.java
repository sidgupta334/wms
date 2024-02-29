package com.wms.praise.repository;

import com.wms.praise.model.Praise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PraiseRepository extends JpaRepository<Praise, String> {
    List<Praise> findByReceiverId(String receiver);


    List<Praise> findByGiverId(String giver);
}
