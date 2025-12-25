package com.quakeguard.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class EarthquakeDTO {
    private Long id;
    private String externalId;
    private Double magnitude;
    private String place;
    private Instant time;
    private String url;
    private Double latitude;
    private Double longitude;
    private Double depth;
}
