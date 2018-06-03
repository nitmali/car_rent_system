package com.nitmali.carrentsys.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Car {
    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 16,nullable = false)
    private String color;

    @Column(length = 32,nullable = false)
    private String brand;

    @Column(length = 8,nullable = false,unique = true)
    private String licensePlate;

    @Column(nullable = false)
    private Integer price;

    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column
    @JsonIgnore
    private String image;

    public enum Status {
        IDLE,
        UNAVAILABLE,
        USING
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
