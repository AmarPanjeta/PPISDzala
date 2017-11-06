package com.example.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.RegisteredUser;


@RepositoryRestResource(path="users",collectionResourceRel="users")
public interface UserRepository extends CrudRepository<RegisteredUser, Long> {

	RegisteredUser findByUsername(@Param("username") String username);
	
	RegisteredUser findFirstByUsernameAndPassword(@Param("username") String username,@Param("password") String password);
	
	RegisteredUser findById(@Param("id") Long id);
	

	@Query("select ru.id from RegisteredUser ru where ru.username=:username")
	long getIdbyUsername(@Param("username") String username);
	
	@Query("select count(u) from RegisteredUser u where u.type=:type")
	int numberByType(@Param("type")int type);
}
