package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.RegisteredUser;
import com.example.models.Service;
import com.example.models.UserService;
import com.example.repositories.ServiceRepository;
import com.example.repositories.UserRepository;
import com.example.repositories.UserServiceRepository;

@RequestMapping("/userservice")
@RestController
public class UserServiceController {

	@Autowired
    private UserServiceRepository usr;
	
	@Autowired
    private UserRepository ur;
	
	@Autowired
    private ServiceRepository sr;
	
	@RequestMapping(value="/{userid}/odjaviuslugu/{serviceid}")
	public void deleteServiceByUser(@PathVariable("userid") long userid, @PathVariable("serviceid") long serviceid)
	{
		RegisteredUser ru=ur.findById(userid);
		Service s=sr.findById(serviceid);
		
		if(ru!=null && s!=null)
		{
	        List<UserService> lista = usr.getByUserAndService(userid, serviceid);
			
	        if(!lista.isEmpty())
	        {
	        	for (UserService us : lista) {
	            usr.delete(us);
	        	}
	        }
	        
		}
		
	}
			
}
