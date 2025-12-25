package com.quakeguard.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class BuildingSafetyScoreDTO {
    private Long id;
    private String location;
    private Integer buildingAge;
    private Integer numberOfFloors;
    private String constructionType;
    private Double score;
    private Instant createdAt;
}
