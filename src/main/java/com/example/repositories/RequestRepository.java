package com.example.repositories;

import com.example.models.RegisteredUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.models.Request;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends CrudRepository<Request, Long>{
Request findById(@Param("id") long id);
    @Query("select i from Request i where i.user=:userid")
    List<Request> getByUser(@Param("userid") RegisteredUser userid);
    
	@Query("select i from Request i where i.status.status<>'Zatvoren' and i.status.status<>'Pogresno prijavljen' and i.status.status<>'Odbijen'")
	List<Request> getActiveRequests();
	
	@Query("select count(i) from Request i where i.status.status<>'Zatvoren' and i.status.status<>'Pogresno prijavljen' and i.status.status<>'Odbijen'")
	int countActiveRequests();
	
	@Query("select i from Request i where i.status.status='Zatvoren' or i.status.status='Odbijen' or i.status.status='Pogresno prijavljen'")
	List<Request> getClosedRequests();
	
	@Query("select count(i) from Request i where i.status.status='Zatvoren' or i.status.status='Odbijen' or i.status.status='Pogresno prijavljen'")
	int countClosedRequests();
	
	@Query("select count(i) from Request i")
	int countRequests();
}
