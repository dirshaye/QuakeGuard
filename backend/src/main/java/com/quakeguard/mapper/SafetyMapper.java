package com.quakeguard.mapper;

import com.quakeguard.domain.BuildingSafetyScore;
import com.quakeguard.dto.BuildingSafetyScoreDTO;
import org.springframework.stereotype.Component;

@Component
public class SafetyMapper {

    public BuildingSafetyScoreDTO toDTO(BuildingSafetyScore entity) {
        if (entity == null) return null;

        BuildingSafetyScoreDTO dto = new BuildingSafetyScoreDTO();
        dto.setId(entity.getId());
        dto.setLocation(entity.getLocation());
        dto.setBuildingAge(entity.getBuildingAge());
        dto.setNumberOfFloors(entity.getNumberOfFloors());
        dto.setConstructionType(entity.getConstructionType());
        dto.setScore(entity.getScore());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

    public BuildingSafetyScore toEntity(BuildingSafetyScoreDTO dto) {
        if (dto == null) return null;

        return BuildingSafetyScore.builder()
                .location(dto.getLocation())
                .buildingAge(dto.getBuildingAge())
                .numberOfFloors(dto.getNumberOfFloors())
                .constructionType(dto.getConstructionType())
                .build();
    }
}
