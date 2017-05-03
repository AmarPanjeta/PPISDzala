package com.example.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.models.RegisteredUser;

public interface UserReposiroty extends CrudRepository<RegisteredUser, Long> {

}
