package com.example.repositories;

import com.example.models.RegisteredUser;
import com.example.models.Service;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Incident;

import java.util.Date;
import java.util.List;

@RepositoryRestResource(path="incidents",collectionResourceRel="incidents")
public interface IncidentRepository extends CrudRepository<Incident, Long>{
	Incident findById(@Param("id") long id);

	@Query("select i from Incident i where i.user=:userid")
	List<Incident> getByUser(@Param("userid") RegisteredUser userid);
	
	@Query("select i from Incident i where i.status.status<>'Zatvoren'")
	List<Incident> getActiveIncidents();
	
	@Query("select i from Incident i where i.status.status<>'Zatvoren' and i.user.id=:userid")
	List<Incident> getActiveIncidentsByUser(@Param("userid") long userid);
	
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
	
	@Query("select count(i) from Incident i where i.created between :d1 and :d2")
	int countIncidentsByDate(@Param("d1") Date d1,@Param("d2") Date d2);
	
	@Query("select count(i) from Incident i where i.created between :d1 and :d2 and i.status.status='Zatvoren'")
	int countClosedIncidentsByDate(@Param("d1") Date d1,@Param("d2") Date d2);
	
	@Query("select count(i) from Incident i where i.created between :d1 and :d2 and i.status.status<>'Zatvoren'")
	int countActiveIncidentsByDate(@Param("d1") Date d1,@Param("d2") Date d2);
	
}
