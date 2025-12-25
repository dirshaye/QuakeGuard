package com.quakeguard.repository;

import com.quakeguard.domain.FeltReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeltReportRepository extends JpaRepository<FeltReport, Long> {
}
