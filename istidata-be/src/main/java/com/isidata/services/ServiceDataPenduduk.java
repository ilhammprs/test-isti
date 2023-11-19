package com.isidata.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isidata.models.entities.DataPenduduk;
import com.isidata.models.repos.RepositoriDataPenduduk;

@Service
@Transactional
public class ServiceDataPenduduk {

    @Autowired
    private RepositoriDataPenduduk dataPendudukRepo;

    public DataPenduduk save(DataPenduduk DataPenduduk) {
        return dataPendudukRepo.save(DataPenduduk);
    }

    public DataPenduduk findOne(String id) {
        Optional<DataPenduduk> Data = dataPendudukRepo.findById(id);
        if (!Data.isPresent()) {
            return null;
        } else {
            return Data.get();
        }
    }

    public Iterable<DataPenduduk> findAll() {
        return dataPendudukRepo.findAll();
    }

    public void removeOne(String id) {
        dataPendudukRepo.deleteById(id);
    }

    public List<DataPenduduk> findByName(String name) {
        return dataPendudukRepo.findByNameContains(name);
    }

    public List<DataPenduduk> searchDatas(String nik, String name) {
        List<DataPenduduk> datapenduduks = null;
        if (nik != "" && name == "") {
            datapenduduks = dataPendudukRepo.searchDatabyNIK(nik);
        } else if (nik == "" && name != "") {
            datapenduduks = dataPendudukRepo.searchDatabyName(name);
        } else {
            datapenduduks = dataPendudukRepo.searchDatabyNIKandName(nik, name);
        }
        return datapenduduks;
    }

}
