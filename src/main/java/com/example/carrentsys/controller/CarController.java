package com.example.carrentsys.controller;

import com.example.carrentsys.entity.Car;
import com.example.carrentsys.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Objects;

@Controller
public class CarController {
    private final CarRepository carRepository;

    @Autowired
    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @RequestMapping(value = "/getCarInfoList")
    @ResponseBody
    public List<Car> getCarInfoList() {
        return carRepository.findAll();
    }

    @RequestMapping(value = "/saveCarInfo")
    @ResponseBody
    public String saveCarInfo(
            String id,
            String brand,
            String color,
            String licensePlate,
            String price,
            String status
    ) {
        if (Objects.equals(brand, "") ||
                Objects.equals(color, "") ||
                Objects.equals(licensePlate, "") ||
                Objects.equals(price, "") ||
                Objects.equals(status, "")) {
            return "{\"msg\":\"null\"}";
        } else {
            if(licensePlate.length()>8) {
                return "{\"msg\":\"error\"}";
            }
            if (carRepository.existsByLicensePlate(licensePlate)&& !Objects.equals(id, String.valueOf(carRepository.findByLicensePlate(licensePlate).getId()))) {
                return "{\"msg\":\"lp_repeat\"}";
            } else {
                Car car = new Car();
                if (id != null) {
                    car.setId(Integer.parseInt(id));
                }
                car.setBrand(brand);
                car.setColor(color);
                car.setLicensePlate(licensePlate);
                car.setPrice(Integer.parseInt(price));
                if (Objects.equals(status, "0")) {
                    car.setStatus(Car.Status.IDLE);
                } else if (Objects.equals(status, "1")) {
                    car.setStatus(Car.Status.BOOKING);
                } else if (Objects.equals(status, "2")) {
                    car.setStatus(Car.Status.USING);
                } else {
                    System.out.println("status input error!");
                    return "{\"msg\":\"error\"}";
                }
                carRepository.save(car);
                return "{\"msg\":\"success\"}";
            }
        }
    }

    @RequestMapping(value = "/deleteCarInfo")
    @ResponseBody
    public String deleteCarInfo(String id) {
        if (id != null) {
            carRepository.delete(Integer.parseInt(id));
            return "{\"msg\":\"success\"}";
        } else {
            return "{\"msg\":\"error\"}";
        }
    }
}
