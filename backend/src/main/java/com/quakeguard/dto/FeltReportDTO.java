package com.quakeguard.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class FeltReportDTO {
    private Long id;
    private Integer intensity;
    private Double latitude;
    private Double longitude;
    private Instant timestamp;
    private String description;
}
