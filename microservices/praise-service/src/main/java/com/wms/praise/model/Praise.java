package com.wms.praise.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Praise {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;
    private String title;
    private String giverId;
    private String receiverId;
    private String description;
    private Date timestamp;
}
