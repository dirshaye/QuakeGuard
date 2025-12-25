package com.quakeguard.controller;

import com.quakeguard.dto.BuildingSafetyScoreDTO;
import com.quakeguard.service.SafetyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/safety")
@RequiredArgsConstructor
public class SafetyController {

    private final SafetyService safetyService;

    @PostMapping("/calculate")
    public ResponseEntity<BuildingSafetyScoreDTO> calculateScore(@RequestBody BuildingSafetyScoreDTO input) {
        return ResponseEntity.ok(safetyService.calculateAndSaveScore(input));
    }
}
