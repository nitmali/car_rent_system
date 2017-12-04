package com.example.carrentsys.controller;

import com.example.carrentsys.entity.Car;
import com.example.carrentsys.service.CarService;
import com.example.carrentsys.service.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.*;


@Controller
public class CarController {
    private final CarService carService;
    private final StorageService storageService;

    @Autowired
    public CarController(CarService carRepository, StorageService storageService) {
        this.carService = carRepository;
        this.storageService = storageService;
    }

    @RequestMapping(value = "/getAllCars", method = RequestMethod.GET)
    @ResponseBody
    public List<Car> getAllCars() {
        return carService.findAll();
    }

    @RequestMapping(value = "/protect/saveCarInfo", method = RequestMethod.POST)
    @ResponseBody
    @Transactional(rollbackFor = Exception.class)
    public String saveCarInfo(
            Long id,
            String brand,
            String color,
            String licensePlate,
            String price,
            Car.Status status,
            @RequestParam(value = "pic", required = false) MultipartFile file
    ) {
        if (Objects.equals(brand, "") ||
                Objects.equals(color, "") ||
                Objects.equals(licensePlate, "") ||
                Objects.equals(price, "") ||
                status == null) {
            return "{\"msg\":\"null\"}";
        } else {
            if (licensePlate.length() > 8) {
                return "{\"msg\":\"error\"}";
            }
            if (carService.existsByLicensePlate(licensePlate) && !Objects.equals(id, carService.findByLicensePlate(licensePlate).getId())) {
                return "{\"msg\":\"lp_repeat\"}";
            } else {
                Car car = new Car();
                if (id != null) {
                    car = carService.findOne(id);
                }
                car.setBrand(brand);
                car.setColor(color);
                car.setLicensePlate(licensePlate);
                car.setPrice(Integer.parseInt(price));
                car.setStatus(status);
                if (!file.isEmpty()) {
                    String picname = storageService.store(file);
                    car.setImage(picname);
                }
                carService.save(car);
                return "{\"msg\":\"success\"}";
            }
        }
    }

    @RequestMapping(value = "/carImage", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Resource> getCarImage(Long id) {
        String picname = carService.findOne(id).getImage();
        Resource file = storageService.loadAsResource(picname);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + picname + "\"").body(file);
    }

    @RequestMapping(value = "/protect/deleteCarInfo", method = RequestMethod.POST)
    @ResponseBody
    public String deleteCarInfo(Long id) {
        if (id != null) {
            storageService.delete(carService.findOne(id).getImage());
            carService.delete(id);
            return "{\"msg\":\"success\"}";
        } else {
            return "{\"msg\":\"error\"}";
        }
    }

    @RequestMapping(value = "/countCarsByStatus", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Long> countByStatus() {
        Map<String, Long> map = new HashMap<>();
        map.put("IDLE", carService.countByStatus(Car.Status.IDLE));
        map.put("UNAVAILABLE", carService.countByStatus(Car.Status.UNAVAILABLE));
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
    public List<Car> getAvailableCars(Timestamp planingLendStartTime, Timestamp planingLendEndTime,
                                      @RequestParam(required = false) Integer lowestPrice,
                                      @RequestParam(required = false) Integer highestPrice) {
        if (lowestPrice == null && highestPrice == null) {
            return carService.getAvailableCars(planingLendStartTime, planingLendEndTime);
        }
        if (lowestPrice != null && highestPrice != null) {
            return carService.getAvailableCars(planingLendStartTime, planingLendEndTime, lowestPrice, highestPrice);
        } else {
            return new ArrayList<>();
        }
    }
}
