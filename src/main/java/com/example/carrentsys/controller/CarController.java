package com.example.carrentsys.controller;

import com.example.carrentsys.entity.Car;
import com.example.carrentsys.repository.CarRepository;
import com.example.carrentsys.repository.RentingLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.util.*;

@Controller
public class CarController {
    private final CarRepository carRepository;
    private final RentingLogRepository rentingLogRepository;

    @Autowired
    public CarController(CarRepository carRepository, RentingLogRepository rentingLogRepository) {
        this.carRepository = carRepository;
        this.rentingLogRepository = rentingLogRepository;
    }

    @RequestMapping(value = "/manage/getAllCars", method = RequestMethod.GET)
    @ResponseBody
    public List<Car> getAllCars() {
        return carRepository.findAll();
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
            if (carRepository.existsByLicensePlate(licensePlate) && !Objects.equals(id, String.valueOf(carRepository.findByLicensePlate(licensePlate).getId()))) {
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
                carRepository.save(car);
                return "{\"msg\":\"success\"}";
            }
        }
    }

    @RequestMapping(value = "/manage/deleteCarInfo", method = RequestMethod.POST)
    @ResponseBody
    public String deleteCarInfo(String id) {
        if (id != null) {
            carRepository.delete(Integer.parseInt(id));
            return "{\"msg\":\"success\"}";
        } else {
            return "{\"msg\":\"error\"}";
        }
    }

    @RequestMapping(value = "/countCarsByStatus", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Integer> countByStatus() {
        Map<String, Integer> map = new HashMap<>();
        map.put("IDLE", carRepository.countByStatus(Car.Status.IDLE));
        map.put("BOOKING", carRepository.countByStatus(Car.Status.BOOKING));
        map.put("USING", carRepository.countByStatus(Car.Status.USING));
        return map;
    }

    @RequestMapping(value = "/getCarsByStatus", method = RequestMethod.GET)
    @ResponseBody
    public List<Car> getCarsByStatus(@RequestParam("status") Car.Status status) {
        return carRepository.findByStatus(status);
    }

    @RequestMapping(value = "/getAvailableCars", method = RequestMethod.GET)
    @ResponseBody
    public List<Car> getAvailableCars(Timestamp planingLendStartTime, Timestamp planingLendEndTime, int lowestPrice, int highestPrice) {
        if (planingLendEndTime.getTime() < planingLendStartTime.getTime()) return new ArrayList<>();
        if (lowestPrice >= highestPrice) return new ArrayList<>();
        Assert.notNull(planingLendEndTime, "planing time can not be empty");
        Assert.notNull(planingLendStartTime, "planing time can not be empty");
        List<Car> availableCars = new ArrayList<>();
        availableCars.addAll(carRepository.findAll());
        availableCars.removeAll(rentingLogRepository.findUnavailableCarNotIDLE(planingLendStartTime, planingLendEndTime));
        availableCars.removeAll(carRepository.findByPriceOutof(lowestPrice, highestPrice));
        return availableCars;
    }
}
