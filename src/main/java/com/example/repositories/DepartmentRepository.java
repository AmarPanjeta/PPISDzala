package com.example.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.models.Department;

public interface DepartmentRepository extends CrudRepository<Department, Long>{

}
