package com.quakeguard.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "earthquakes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Earthquake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String externalId; // ID from USGS

    private Double magnitude;

    private String place;

    private Instant time;

    private String url;

    private Double latitude;

    private Double longitude;

    private Double depth;
}
