package com.wms.praise.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "praiseId")
    @JsonIgnore
    private Praise praise;
    private String skillId;
    private Date timestamp;
}
