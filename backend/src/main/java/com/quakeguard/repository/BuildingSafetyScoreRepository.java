package com.quakeguard.repository;

import com.quakeguard.domain.BuildingSafetyScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingSafetyScoreRepository extends JpaRepository<BuildingSafetyScore, Long> {
}
