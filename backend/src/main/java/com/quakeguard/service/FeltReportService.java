package com.quakeguard.service;

import com.quakeguard.dto.FeltReportDTO;
import java.util.Map;

public interface FeltReportService {

    FeltReportDTO submitReport(FeltReportDTO request);

    Map<String, Object> getReportStats();
}
