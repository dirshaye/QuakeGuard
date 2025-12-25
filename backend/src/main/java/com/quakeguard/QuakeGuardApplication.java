package com.quakeguard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class QuakeGuardApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuakeGuardApplication.class, args);
	}

}
