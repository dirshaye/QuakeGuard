package com.quakeguard.ingestion;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quakeguard.domain.Earthquake;
import com.quakeguard.repository.EarthquakeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Instant;

@Component
@Slf4j
@RequiredArgsConstructor
public class EarthquakeIngestionTask {

    private final EarthquakeRepository earthquakeRepository;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    private static final String USGS_API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

    @Scheduled(fixedRate = 60000) // Every 1 minute
    public void fetchEarthquakeData() {
        log.info("Starting earthquake data ingestion...");

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(USGS_API_URL))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode root = objectMapper.readTree(response.body());
                JsonNode features = root.path("features");

                if (features.isArray()) {
                    for (JsonNode feature : features) {
                        processFeature(feature);
                    }
                }
            } else {
                log.error("Failed to fetch data from USGS. Status code: {}", response.statusCode());
            }

        } catch (Exception e) {
            log.error("Error during earthquake ingestion", e);
        }

        log.info("Earthquake data ingestion completed.");
    }

    private void processFeature(JsonNode feature) {
        try {
            String externalId = feature.path("id").asText();
            
            // Check if already exists
            if (earthquakeRepository.findByExternalId(externalId).isPresent()) {
                return; // Skip if exists
            }

            JsonNode properties = feature.path("properties");
            JsonNode geometry = feature.path("geometry");
            JsonNode coordinates = geometry.path("coordinates");

            Earthquake earthquake = Earthquake.builder()
                    .externalId(externalId)
                    .magnitude(properties.path("mag").asDouble())
                    .place(properties.path("place").asText())
                    .time(Instant.ofEpochMilli(properties.path("time").asLong()))
                    .url(properties.path("url").asText())
                    .longitude(coordinates.get(0).asDouble())
                    .latitude(coordinates.get(1).asDouble())
                    .depth(coordinates.get(2).asDouble())
                    .build();

            earthquakeRepository.save(earthquake);
            log.debug("Saved new earthquake: {}", externalId);

        } catch (Exception e) {
            log.error("Error processing earthquake feature", e);
        }
    }
}
