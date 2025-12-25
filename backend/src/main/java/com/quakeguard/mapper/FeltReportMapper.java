package com.quakeguard.mapper;

import com.quakeguard.domain.FeltReport;
import com.quakeguard.dto.FeltReportDTO;
import org.springframework.stereotype.Component;

@Component
public class FeltReportMapper {

    public FeltReportDTO toDTO(FeltReport entity) {
        if (entity == null) return null;

        FeltReportDTO dto = new FeltReportDTO();
        dto.setId(entity.getId());
        dto.setIntensity(entity.getIntensity());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setTimestamp(entity.getTimestamp());
        dto.setDescription(entity.getDescription());
        return dto;
    }

    public FeltReport toEntity(FeltReportDTO dto) {
        if (dto == null) return null;

        return FeltReport.builder()
                .intensity(dto.getIntensity())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .description(dto.getDescription())
                .timestamp(dto.getTimestamp() != null ? dto.getTimestamp() : java.time.Instant.now())
                .build();
    }
}
