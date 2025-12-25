package com.quakeguard.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "building_safety_scores")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingSafetyScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String location;
    private Integer buildingAge;
    private Integer numberOfFloors;
    private String constructionType; // e.g., "Reinforced Concrete", "Wood", "Steel"

    private Double score; // Calculated score

    @CreationTimestamp
    private Instant createdAt;
}
