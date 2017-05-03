package com.example.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.models.Incident;

public interface IncidentRepository extends CrudRepository<Incident, Long>{

}
