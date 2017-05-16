package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Service;
import com.example.repositories.ServiceRepository;

@RestController
@RequestMapping("/services")
public class ServiceController {
@Autowired
ServiceRepository sr;

@RequestMapping("/getuserservices")
List<Service> getUserServices(@RequestParam("id") long id){
	return (List<Service>)sr.getServicesByUserId(id);
}
}
