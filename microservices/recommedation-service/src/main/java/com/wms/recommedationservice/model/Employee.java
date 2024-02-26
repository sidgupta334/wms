package com.wms.recommedationservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Document(indexName = "employee")
public class Employee {
    @Id
    private String externalId;
    @Field(type = FieldType.Text, analyzer = "standard")
    private String name;
    private String email;
    private boolean isAdmin;
    private JobTitle jobTitle;
    private List<Skill> skills;
}
