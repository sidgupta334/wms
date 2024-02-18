package com.wms.authservice.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
public class UserCredential {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String entityId;
    private String externalId;
    private String email;
    private String password;
    private Boolean isAdmin;
    private Date timestamps;
}
