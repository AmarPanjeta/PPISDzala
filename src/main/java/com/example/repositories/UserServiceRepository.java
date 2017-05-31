package com.example.repositories;

import com.example.models.RegisteredUser;
import com.example.models.Service;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.models.UserService;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource(path="userservices",collectionResourceRel="userservices")
public interface UserServiceRepository extends CrudRepository<UserService, Long>{
    @Query("select ru.service from UserService ru where ru.user=:userid")
    List<Service> getByUser(@Param("userid") RegisteredUser userid);

    @Query("select ru from UserService ru where ru.user=:userid and ru.service=:serviceid")
    List<UserService> getByUserAndService(@Param("userid") RegisteredUser userid, @Param("serviceid") Service serviceid);

    @Query("select count(ru) from UserService ru where ru.user=:userid and ru.service=:serviceid")
    int isUserOfService(@Param("userid") RegisteredUser userid, @Param("serviceid") Service serviceid);

}
