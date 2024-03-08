package com.wms.recommedationservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Document(indexName = "opportunity")
public class Opportunity {
    @Id
    private String entityId;
    private String title;
    private String description;
    private Date timestamp;
    @Field(type = FieldType.Nested, includeInParent = true)
    private JobTitle jobTitle;
    @Field(type = FieldType.Nested, includeInParent = true)
    private List<Skill> skills;
}
