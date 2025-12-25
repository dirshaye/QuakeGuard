package com.quakeguard.repository;

import com.quakeguard.domain.Earthquake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface EarthquakeRepository extends JpaRepository<Earthquake, Long> {

    Optional<Earthquake> findByExternalId(String externalId);

    List<Earthquake> findByMagnitudeGreaterThanEqualAndTimeBetween(Double magnitude, Instant startTime, Instant endTime);

    List<Earthquake> findByMagnitudeGreaterThanEqual(Double magnitude);

    // Simple bounding box search
    List<Earthquake> findByLatitudeBetweenAndLongitudeBetween(Double minLat, Double maxLat, Double minLon, Double maxLon);
    
    // Find recent earthquakes
    List<Earthquake> findTop50ByOrderByTimeDesc();
}
