package com.career.portal.service;

import com.career.portal.entity.Career;
import com.career.portal.repository.CareerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CareerService {

    private final CareerRepository careerRepository;

    public CareerService(CareerRepository careerRepository) {
        this.careerRepository = careerRepository;
    }

    public List<Career> getAllCareers() {
        return careerRepository.findAll();
    }

    public Optional<Career> getCareerById(Long id) {
        return careerRepository.findById(id);
    }

    public Career saveCareer(Career career) {
        return careerRepository.save(career);
    }

    public void deleteCareer(Long id) {
        careerRepository.deleteById(id);
    }
}
