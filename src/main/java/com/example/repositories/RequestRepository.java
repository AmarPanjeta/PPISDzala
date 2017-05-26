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
    
	@Query("select i from Request i where i.status.status<>'Zatvoren'")
	List<Request> getActiveRequests();
	
	@Query("select count(i) from Request i where i.status.status<>'Zatvoren'")
	int countActiveRequests();
	
	@Query("select i from Request i where i.status.status='Zatvoren'")
	List<Request> getClosedRequests();
	
	@Query("select count(i) from Request i where i.status.status='Zatvoren'")
	int countClosedRequests();
	
	@Query("select count(i) from Request i")
	int countRequests();
}
