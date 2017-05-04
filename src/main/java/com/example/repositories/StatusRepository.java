package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.models.Status;

public interface StatusRepository extends CrudRepository<Status, Long>{
	Status findByStatus(@Param("status") String status);
}
