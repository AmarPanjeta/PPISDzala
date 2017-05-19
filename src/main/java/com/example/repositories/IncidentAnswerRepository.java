package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.IncidentAnswer;
import com.example.models.UserService;

@RepositoryRestResource(path="incidentanswers",collectionResourceRel="incidentanswers")
public interface IncidentAnswerRepository extends CrudRepository<IncidentAnswer, Long>{

}
