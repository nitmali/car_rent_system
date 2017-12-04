package com.example.carrentsys.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class RentingLog {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Client client;

    @ManyToOne
    private Car car;

    @ManyToOne
    private Admin admin;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Timestamp submitTime = new Timestamp(System.currentTimeMillis());

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Timestamp planingLendStartTime;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Timestamp planingLendEndTime;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Timestamp approvalTime;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Timestamp lendStartTime;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Timestamp lendEndTime;

    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        PENDING,
        PASS,
        REJECT,
        FINISH,
        CANCEL
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Timestamp getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Timestamp submitTime) {
        this.submitTime = submitTime;
    }

    public Timestamp getPlaningLendStartTime() {
        return planingLendStartTime;
    }

    public void setPlaningLendStartTime(Timestamp planingLendStartTime) {
        this.planingLendStartTime = planingLendStartTime;
    }

    public Timestamp getPlaningLendEndTime() {
        return planingLendEndTime;
    }

    public void setPlaningLendEndTime(Timestamp planingLendEndTime) {
        this.planingLendEndTime = planingLendEndTime;
    }

    public Timestamp getApprovalTime() {
        return approvalTime;
    }

    public void setApprovalTime(Timestamp approvalTime) {
        this.approvalTime = approvalTime;
    }

    public Timestamp getLendStartTime() {
        return lendStartTime;
    }

    public void setLendStartTime(Timestamp lendStartTime) {
        this.lendStartTime = lendStartTime;
    }

    public Timestamp getLendEndTime() {
        return lendEndTime;
    }

    public void setLendEndTime(Timestamp lendEndTime) {
        this.lendEndTime = lendEndTime;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }
}
