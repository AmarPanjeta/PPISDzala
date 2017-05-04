package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.models.Incident;

public interface IncidentRepository extends CrudRepository<Incident, Long>{
	Incident findById(@Param("id") long id);
	
}
