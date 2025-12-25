package com.quakeguard.service.impl;

import com.quakeguard.domain.FeltReport;
import com.quakeguard.dto.FeltReportDTO;
import com.quakeguard.mapper.FeltReportMapper;
import com.quakeguard.repository.FeltReportRepository;
import com.quakeguard.service.FeltReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FeltReportServiceImpl implements FeltReportService {

    private final FeltReportRepository repository;
    private final FeltReportMapper mapper;

    @Override
    public FeltReportDTO submitReport(FeltReportDTO report) {
        FeltReport entity = mapper.toEntity(report);
        FeltReport saved = repository.save(entity);
        return mapper.toDTO(saved);
    }

    @Override
    public Map<String, Object> getReportStats() {
        List<FeltReport> allReports = repository.findAll();
        
        long count = allReports.size();
        double avgIntensity = allReports.stream()
                .mapToDouble(FeltReport::getIntensity)
                .average()
                .orElse(0.0);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalReports", count);
        stats.put("averageIntensity", avgIntensity);
        
        return stats;
    }
}
