package com.example.repositories;

import com.example.models.RegisteredUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.models.Request;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface RequestRepository extends CrudRepository<Request, Long>{
Request findById(@Param("id") long id);
    @Query("select i from Request i where i.user=:userid")
    List<Request> getByUser(@Param("userid") RegisteredUser userid);
    
	@Query("select i from Request i where i.status.status<>'Zatvoren' and i.status.status<>'Pogresno prijavljen' and i.status.status<>'Odbijen'")
	List<Request> getActiveRequests();
	
	@Query("select i from Request i where i.status.status<>'Zatvoren' and i.status.status<>'Pogresno prijavljen' and i.status.status<>'Odbijen' and i.user.id=:userid")
	List<Request> getActiveRequestsByUser(@Param("userid") long userid);
	
	@Query("select count(i) from Request i where i.status.status<>'Zatvoren' and i.status.status<>'Pogresno prijavljen' and i.status.status<>'Odbijen'")
	int countActiveRequests();
	
	@Query("select i from Request i where i.status.status='Zatvoren' or i.status.status='Odbijen' or i.status.status='Pogresno prijavljen'")
	List<Request> getClosedRequests();
	
	@Query("select count(i) from Request i where i.status.status='Zatvoren' or i.status.status='Odbijen' or i.status.status='Pogresno prijavljen'")
	int countClosedRequests();
	
	@Query("select count(i) from Request i")
	int countRequests();
	
	@Query("select count(i) from Request i where i.created between :d1 and :d2")
	int countRequestsByDate(@Param("d1") Date d1,@Param("d2") Date d2);
	
	@Query("select count(i) from Request i where i.created between :d1 and :d2 and (i.status.status='Zatvoren' or i.status.status='Odbijen' or i.status.status='Pogresno prijavljen')")
	int countClosedRequestsByDate(@Param("d1") Date d1,@Param("d2") Date d2);
	
	@Query("select count(i) from Request i where i.created between :d1 and :d2 and i.status.status<>'Zatvoren' and i.status.status<>'Pogresno prijavljen' and i.status.status<>'Odbijen'")
	int countActiveRequestsByDate(@Param("d1") Date d1,@Param("d2") Date d2);
}
