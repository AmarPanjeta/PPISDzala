package com.example.controllers;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.RegisteredUser;
import com.example.repositories.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserRepository ur;
	
	@RequestMapping("/login")
	public LoginData login(@RequestBody LoginData data) throws ServletException{
		
		if(data.username==null || data.username.isEmpty() || data.password==null || data.password.isEmpty()){ 
			
			throw new ServletException("Polja nisu popunjena");
		
		}
		
		RegisteredUser user=ur.findFirstByUsernameAndPassword(data.username, data.password);
		if(user !=null){
			return data;
		}
		else{
			throw new ServletException("Pogresna kombinacija username-password");
		}
		
	}
	
	@RequestMapping("/register")
	public UserData register(@RequestBody UserData data) throws ServletException{
		
		if(data.username==null || data.username.isEmpty() || data.password==null || data.password.isEmpty() || data.surname==null || data.surname.isEmpty() || data.name==null || data.name.isEmpty() || data.address==null || data.address.isEmpty() || data.telephone.isEmpty() || data.telephone==null){
			throw new ServletException("Polja nisu popunjena");
		}
		
		if(ur.findByUsername(data.username)!=null){
			throw new ServletException("Korisnicko ime je vec zauzeto");
		}
		
		RegisteredUser user=new RegisteredUser();
		user.setName(data.name);
		user.setUsername(data.username);
		user.setPassword(data.password);
		user.setAddress(data.address);
		user.setSurname(data.surname);
		user.setTelephone(data.telephone);
		user.setType(data.type);
		
		ur.save(user);
		return data;
	}
		
	
	
	@SuppressWarnings("unused")
	private static class UserData{
		
		public String username;
		public String password;
		public String name;
		public String surname;
		public String address;
		public String telephone;
		public int type;
		
	}
	
	@SuppressWarnings("unused")
	private static class LoginData{
		
		public String username;
		public String password;
		
	}
}
