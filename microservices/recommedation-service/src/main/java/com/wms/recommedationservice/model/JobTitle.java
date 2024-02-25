package com.wms.recommedationservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Document(indexName = "job-title")
public class JobTitle {
    @Id
    private String externalCode;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String name;
}
