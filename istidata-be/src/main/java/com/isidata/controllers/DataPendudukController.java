package com.isidata.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isidata.models.entities.DataPenduduk;
import com.isidata.services.ServiceDataPenduduk;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/data")
public class DataPendudukController {

    @Autowired
    private ServiceDataPenduduk ServiceDataPenduduk;

    @PostMapping
    public DataPenduduk save(@RequestBody DataPenduduk dataPenduduk) {
        return ServiceDataPenduduk.save(dataPenduduk);
    }

    @GetMapping
    public Iterable<DataPenduduk> findAll() {
        return ServiceDataPenduduk.findAll();
    }

    @GetMapping("{id}")
    public DataPenduduk findOne(@PathVariable("id") String id) {
        return ServiceDataPenduduk.findOne(id);
    }

    @PostMapping("/search")
    public List<DataPenduduk> search(@RequestBody DataPenduduk dataPenduduk) {
        return ServiceDataPenduduk.searchDatas(dataPenduduk.getNik(), dataPenduduk.getName());
    }

    @PatchMapping
    public DataPenduduk update(@RequestBody DataPenduduk dataPenduduk) {
        return ServiceDataPenduduk.save(dataPenduduk);
    }

    @DeleteMapping("{id}")
    public void removeOne(@PathVariable("id") String id) {
        ServiceDataPenduduk.removeOne(id);
    }
}
