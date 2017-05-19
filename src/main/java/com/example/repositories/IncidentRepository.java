package com.example.repositories;

import com.example.models.RegisteredUser;
import com.example.models.Service;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Incident;

import java.util.List;

@RepositoryRestResource(path="incidents",collectionResourceRel="incidents")
public interface IncidentRepository extends CrudRepository<Incident, Long>{
	Incident findById(@Param("id") long id);

	@Query("select i from Incident i where i.user=:userid")
	List<Incident> getByUser(@Param("userid") RegisteredUser userid);
	
	@Query("select i from Incident i where i.status.status<>'Zatvoren'")
	List<Incident> getActiveIncidents();
	
	@Query("select count(i) from Incident i where i.status.status<>'Zatvoren'")
	int countActiveIncidents();
	
	@Query("select i from Incident i where i.status.status='Zatvoren'")
	List<Incident> getClosedIncidents();
	
	@Query("select count(i) from Incident i where i.status.status='Zatvoren'")
	int countClosedIncidents();
	
	@Query("select count(i) from Incident i")
	int countIncidents();
	
	@Query("select count(i) from Incident i where i.priority=:priority")
	int countIncidentsByPriority(@Param("priority") int priority);
	
	@Query("select i from Incident i where i.incident=null")
	List<Incident> getMainIncidents();
	
}
