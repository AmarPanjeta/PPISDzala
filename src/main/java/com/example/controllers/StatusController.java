package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Status;
import com.example.repositories.StatusRepository;

@RestController
@RequestMapping("/statuses")
public class StatusController {
	
	@Autowired
	StatusRepository sr;
	
	@RequestMapping("/all")
	public List<Status> getAll(){
		return (List<Status>)sr.findAll();
	}
}
