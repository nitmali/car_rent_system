package com.example.carrentsys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class CarrentsysApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarrentsysApplication.class, args);
	}
}
