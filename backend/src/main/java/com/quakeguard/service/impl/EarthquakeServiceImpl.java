package com.quakeguard.service.impl;

import com.quakeguard.domain.Earthquake;
import com.quakeguard.dto.EarthquakeDTO;
import com.quakeguard.mapper.EarthquakeMapper;
import com.quakeguard.repository.EarthquakeRepository;
import com.quakeguard.service.EarthquakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EarthquakeServiceImpl implements EarthquakeService {

    private final EarthquakeRepository earthquakeRepository;
    private final EarthquakeMapper earthquakeMapper;

    @Override
    public List<EarthquakeDTO> getRecentEarthquakes() {
        return earthquakeRepository.findAll(Sort.by(Sort.Direction.DESC, "time"))
                .stream()
                .limit(50) // Limit to 50 most recent
                .map(earthquakeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<EarthquakeDTO> getEarthquakesByMagnitude(Double minMagnitude) {
        return earthquakeRepository.findByMagnitudeGreaterThanEqual(minMagnitude)
                .stream()
                .map(earthquakeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EarthquakeDTO getEarthquakeById(Long id) {
        return earthquakeRepository.findById(id)
                .map(earthquakeMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Earthquake not found"));
    }

    @Override
    public List<EarthquakeDTO> filterEarthquakes(Double minMagnitude, Instant startTime, Instant endTime) {
        return earthquakeRepository.findByMagnitudeGreaterThanEqualAndTimeBetween(minMagnitude, startTime, endTime).stream()
                .map(earthquakeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void saveEarthquake(Earthquake earthquake) {
        if (earthquakeRepository.findByExternalId(earthquake.getExternalId()).isEmpty()) {
            earthquakeRepository.save(earthquake);
        }
    }
}
