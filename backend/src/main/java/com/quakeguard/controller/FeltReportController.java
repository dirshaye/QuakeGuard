package com.quakeguard.controller;

import com.quakeguard.dto.FeltReportDTO;
import com.quakeguard.service.FeltReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class FeltReportController {

    private final FeltReportService feltReportService;

    @PostMapping
    public ResponseEntity<FeltReportDTO> submitReport(@RequestBody FeltReportDTO report) {
        return ResponseEntity.ok(feltReportService.submitReport(report));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        return ResponseEntity.ok(feltReportService.getReportStats());
    }
}
