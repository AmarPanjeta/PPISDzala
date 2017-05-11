package com.example;

import com.example.models.RegisteredUser;
import com.example.models.Service;
import com.example.models.Status;
import com.example.repositories.ServiceRepository;
import com.example.repositories.StatusRepository;
import com.example.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class PpisDzaalaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PpisDzaalaApplication.class, args);

	}

	@Bean
	public CommandLineRunner demo(StatusRepository sr,UserRepository ur, ServiceRepository ssr) {
		return (args) -> {
			ArrayList<Status> lista=new ArrayList<Status>();

		Status s=new Status();
		s.setStatus("created");
		lista.add(s);
		s=new Status();
		s.setStatus("approved");
		lista.add(s);
		 s=new Status();
		s.setStatus("rejected");
		lista.add(s);
		s=new Status();
		s.setStatus("fixed");
		lista.add(s);
		s=new Status();
		s.setStatus("canceled");
		lista.add(s);

		for (Status stt:lista
				) {sr.save(stt);
		};

		RegisteredUser user= new RegisteredUser();
		user.setName("Pretplatnik");
		user.setPassword("pretplatnik");
		user.setSurname("Prezime");
		user.setAddress("Zmaja od Bosne");
		user.setType(1);
		user.setUsername("pretplatnik");
		user.setTelephone("0222222");
		ur.save(user);
		user=new RegisteredUser();
		user.setName("admin");
		user.setPassword("admin");
		user.setSurname("admin");
		user.setAddress("Zmaja od Bosne");
		user.setType(2);
		user.setUsername("admin");
		user.setTelephone("0222222");
		ur.save(user);
		Service service=new Service();
		service.setAvailable(true);
		service.setName("Mobilni internet 2GB");
		service.setDescription("Mobilni internet 2GB - trajanje mjesec dana");
		service.setPrice(10);
		ssr.save(service);
		service=new Service();
		service.setAvailable(true);
		service.setName("Student paket");
		service.setDescription("Studentski paket - povoljne cijene telefoniranja i sms poruka");
		service.setPrice(20);
		ssr.save(service);
	};}
}
