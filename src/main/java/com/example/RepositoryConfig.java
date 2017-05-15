package com.example;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import com.example.models.RegisteredUser;
import com.example.models.Service;

@Configuration

public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		// TODO Auto-generated method stub
		config.exposeIdsFor(Service.class);
		config.exposeIdsFor(RegisteredUser.class);
		super.configureRepositoryRestConfiguration(config);
	}
	
}
