package com.quakeguard.service;

import com.quakeguard.dto.BuildingSafetyScoreDTO;

public interface SafetyService {

    BuildingSafetyScoreDTO calculateAndSaveScore(BuildingSafetyScoreDTO input);
}
