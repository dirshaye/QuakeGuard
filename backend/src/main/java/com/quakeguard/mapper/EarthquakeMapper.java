package com.quakeguard.mapper;

import com.quakeguard.domain.Earthquake;
import com.quakeguard.dto.EarthquakeDTO;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class EarthquakeMapper {

    public EarthquakeDTO toDTO(Earthquake entity) {
        if (entity == null) return null;
        EarthquakeDTO dto = new EarthquakeDTO();
        dto.setId(entity.getId());
        dto.setExternalId(entity.getExternalId());
        dto.setMagnitude(entity.getMagnitude());
        dto.setPlace(entity.getPlace());
        dto.setTime(entity.getTime());
        dto.setUrl(entity.getUrl());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setDepth(entity.getDepth());
        return dto;
    }
}
