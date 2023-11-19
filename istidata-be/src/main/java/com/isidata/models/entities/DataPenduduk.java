package com.isidata.models.entities;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="tb_dataa")

public class DataPenduduk implements Serializable {

    @Id
    @Column(unique = true)
    private String nik;
    private String name;
    @Column(length = 500)
    private String address;
    private String gender;
    private LocalDate birth;
    private String country;

    public DataPenduduk() {
    }

    public DataPenduduk(String nik, String name, String address, String gender,
            LocalDate birth,
            String country) {
        this.nik = nik;
        this.name = name;
        this.gender = gender;
        this.address = address;
        this.birth = birth;
        this.country = country;
    }

    public String getNik() {
        return nik;
    }

    public void setNik(String nik) {
        this.nik = nik;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getBirth() {
        return birth;
    }

    public void setBirth(LocalDate birth) {
        this.birth = birth;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public static Iterable<DataPenduduk> findAll() {
        return null;
    }

}
