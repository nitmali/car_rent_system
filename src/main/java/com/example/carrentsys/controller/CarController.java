package com.example.carrentsys.controller;

import com.example.carrentsys.entity.Car;
import com.example.carrentsys.repository.RentingLogRepository;
import com.example.carrentsys.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
public class CarController {
    private final CarService carService;
    private final RentingLogRepository rentingLogRepository;

    @Autowired
    public CarController(CarService carRepository, RentingLogRepository rentingLogRepository) {
        this.carService = carRepository;
        this.rentingLogRepository = rentingLogRepository;
    }

    @RequestMapping(value = "/manage/getAllCars", method = RequestMethod.GET)
    @ResponseBody
    public List<Car> getAllCars() {
        return carService.findAll();
    }

    @RequestMapping(value = "/manage/saveCarInfo", method = RequestMethod.POST)
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
            if (licensePlate.length() > 8) {
                return "{\"msg\":\"error\"}";
            }
            if (carService.existsByLicensePlate(licensePlate) && !Objects.equals(id, String.valueOf(carService.findByLicensePlate(licensePlate).getId()))) {
                return "{\"msg\":\"lp_repeat\"}";
            } else {
                Car car = new Car();
                if (id != null) {
                    car = carService.findOne(Integer.valueOf(id));
                }
                car.setBrand(brand);
                car.setColor(color);
                car.setLicensePlate(licensePlate);
                car.setPrice(Integer.parseInt(price));
                switch (status) {
                    case "0":
                        car.setStatus(Car.Status.IDLE);
                        break;
                    case "1":
                        car.setStatus(Car.Status.BOOKING);
                        break;
                    case "2":
                        car.setStatus(Car.Status.USING);
                        break;
                    default:
                        System.out.println("status input error!");
                        return "{\"msg\":\"error\"}";
                }
                carService.save(car);
                return "{\"msg\":\"success\"}";
            }
        }
    }

    @RequestMapping(value = "/manage/deleteCarInfo", method = RequestMethod.POST)
    @ResponseBody
    public String deleteCarInfo(String id) {
        if (id != null) {
            carService.delete(Integer.parseInt(id));
            return "{\"msg\":\"success\"}";
        } else {
            return "{\"msg\":\"error\"}";
        }
    }

    @RequestMapping(value = "/countCarsByStatus", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Integer> countByStatus() {
        Map<String, Integer> map = new HashMap<>();
        map.put("IDLE", carService.countByStatus(Car.Status.IDLE));
        map.put("BOOKING", carService.countByStatus(Car.Status.BOOKING));
        map.put("USING", carService.countByStatus(Car.Status.USING));
        return map;
    }

    @RequestMapping(value = "/getCarsByStatus", method = RequestMethod.GET)
    @ResponseBody
    public List<Car> getCarsByStatus(@RequestParam("status") Car.Status status) {
        return carService.findByStatus(status);
    }

    @RequestMapping(value = "/getAvailableCars", method = RequestMethod.GET)
    @ResponseBody
    public List<Car> getAvailableCars(Timestamp planingLendStartTime, Timestamp planingLendEndTime, int lowestPrice, int highestPrice) {
        Assert.notNull(planingLendEndTime, "planing time can not be empty");
        Assert.notNull(planingLendStartTime, "planing time can not be empty");
        return carService.getAvailableCars(planingLendStartTime, planingLendEndTime, lowestPrice, highestPrice);
    }
}
