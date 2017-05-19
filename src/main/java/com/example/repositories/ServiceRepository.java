package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.models.Service;

public interface ServiceRepository extends CrudRepository<Service, Long>{
	Service findById(@Param("id") long id);
	
	@Query("select distinct(s) from Service s,UserService us where us.user.id=:id and us.service.id=s.id")
	List<Service> getServicesByUserId(@Param("id") long id);

}
