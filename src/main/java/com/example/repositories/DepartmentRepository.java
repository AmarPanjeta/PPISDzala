package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.models.Department;

public interface DepartmentRepository extends CrudRepository<Department, Long>{
	Department findByName(@Param("name") String name);
}
