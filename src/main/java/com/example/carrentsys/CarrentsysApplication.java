package com.example.carrentsys;

import com.example.carrentsys.service.storage.StorageProperties;
import com.example.carrentsys.service.storage.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@ServletComponentScan
@EnableConfigurationProperties(StorageProperties.class)
public class CarrentsysApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarrentsysApplication.class, args);
	}

    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> storageService.init();
    }
}
