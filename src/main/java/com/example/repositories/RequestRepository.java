package com.example.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.models.Request;

public interface RequestRepository extends CrudRepository<Request, Long>{

}
