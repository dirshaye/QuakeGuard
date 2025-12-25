package com.quakeguard.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "felt_reports")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeltReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer intensity; // 1-10 scale

    private Double latitude;

    private Double longitude;

    private Instant timestamp;

    private String description;
}
