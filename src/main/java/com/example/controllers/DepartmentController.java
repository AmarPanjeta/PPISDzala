package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Department;
import com.example.repositories.DepartmentRepository;

@RestController
@RequestMapping("/departments")
public class DepartmentController {
	
@Autowired
DepartmentRepository dr;

@RequestMapping("/all")
public List<Department> getAllDepartments(){
	return (List<Department>)dr.findAll();
}

}
