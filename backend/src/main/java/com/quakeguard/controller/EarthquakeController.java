package com.quakeguard.controller;

import com.quakeguard.dto.EarthquakeDTO;
import com.quakeguard.service.EarthquakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/earthquakes")
@RequiredArgsConstructor
public class EarthquakeController {

    private final EarthquakeService earthquakeService;

    @GetMapping
    public ResponseEntity<List<EarthquakeDTO>> getRecentEarthquakes() {
        return ResponseEntity.ok(earthquakeService.getRecentEarthquakes());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<EarthquakeDTO>> getByMagnitude(@RequestParam Double minMag) {
        return ResponseEntity.ok(earthquakeService.getEarthquakesByMagnitude(minMag));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EarthquakeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(earthquakeService.getEarthquakeById(id));
    }
}
