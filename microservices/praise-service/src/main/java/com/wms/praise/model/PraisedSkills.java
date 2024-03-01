package com.wms.praise.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PraisedSkills {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;
    private String praiseId;
    private List<String> skillId;
    private Date timestamp;
}
