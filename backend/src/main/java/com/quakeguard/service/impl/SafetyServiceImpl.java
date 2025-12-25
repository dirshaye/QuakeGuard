package com.quakeguard.service.impl;

import com.quakeguard.domain.BuildingSafetyScore;
import com.quakeguard.dto.BuildingSafetyScoreDTO;
import com.quakeguard.mapper.SafetyMapper;
import com.quakeguard.repository.BuildingSafetyScoreRepository;
import com.quakeguard.service.SafetyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SafetyServiceImpl implements SafetyService {

    private final BuildingSafetyScoreRepository repository;
    private final SafetyMapper mapper;

    @Override
    public BuildingSafetyScoreDTO calculateAndSaveScore(BuildingSafetyScoreDTO input) {
        double score = 100.0;

        // Age penalty: -0.5 per year
        if (input.getBuildingAge() != null) {
            score -= (input.getBuildingAge() * 0.5);
        }

        // Floor penalty: -2 per floor above 5
        if (input.getNumberOfFloors() != null && input.getNumberOfFloors() > 5) {
            score -= ((input.getNumberOfFloors() - 5) * 2);
        }

        // Construction type adjustments
        String type = input.getConstructionType() != null ? input.getConstructionType().toLowerCase() : "";
        if (type.contains("wood") || type.contains("steel")) {
            score += 10;
        } else if (type.contains("reinforced concrete")) {
            score += 5;
        } else if (type.contains("adobe") || type.contains("masonry")) {
            score -= 15;
        }

        // Clamp score between 0 and 100
        score = Math.max(0, Math.min(100, score));

        BuildingSafetyScore entity = mapper.toEntity(input);
        entity.setScore(score);

        BuildingSafetyScore saved = repository.save(entity);
        return mapper.toDTO(saved);
    }
}
