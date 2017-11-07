package com.example.carrentsys.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class RentingLog {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    private Client client;

    @ManyToOne
    private Car car;

    @Column(nullable = false)
    private Timestamp submitTime = new Timestamp(System.currentTimeMillis());

    @Column(nullable = false)
    private Timestamp planingLendStartTime;

    @Column(nullable = false)
    private Timestamp planingLendEndTime;

    @Column
    private Timestamp approvalTime;

    @Column
    private Timestamp lendStartTime;

    @Column
    private Timestamp lendEndTime;

    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        PENDING,
        PASS,
        REJECT
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
}
