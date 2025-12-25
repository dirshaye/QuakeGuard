package com.quakeguard.service;

import com.quakeguard.domain.Earthquake;
import com.quakeguard.dto.EarthquakeDTO;

import java.time.Instant;
import java.util.List;

public interface EarthquakeService {

    List<EarthquakeDTO> getRecentEarthquakes();

    EarthquakeDTO getEarthquakeById(Long id);

    List<EarthquakeDTO> filterEarthquakes(Double minMagnitude, Instant startTime, Instant endTime);

    List<EarthquakeDTO> getEarthquakesByMagnitude(Double minMagnitude);

    void saveEarthquake(Earthquake earthquake);
}
