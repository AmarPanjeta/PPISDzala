package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.models.Service;

public interface ServiceRepository extends CrudRepository<Service, Long>{
	Service findById(@Param("id") long id);

}
