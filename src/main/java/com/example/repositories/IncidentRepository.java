package com.example.repositories;

import com.example.models.RegisteredUser;
import com.example.models.Service;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.models.Incident;

import java.util.List;

public interface IncidentRepository extends CrudRepository<Incident, Long>{
	Incident findById(@Param("id") long id);

	@Query("select i from Incident i where i.user=:userid")
	List<Incident> getByUser(@Param("userid") RegisteredUser userid);
	
}
