package com.wms.recommedationservice.model;

import com.wms.recommedationservice.dto.EndorsedSkill;
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
    @Field(type = FieldType.Nested, includeInParent = true)
    private JobTitle jobTitle;
    @Field(type = FieldType.Nested, includeInParent = true)
    private List<Skill> skills;
    @Field(type = FieldType.Nested, includeInParent = true)
    private List<EndorsedSkill> endorsedSkills;
}
