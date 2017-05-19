package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Answer;
import com.example.models.Incident;

@RepositoryRestResource(path="answers",collectionResourceRel="answers")
public interface AnswerRepository extends CrudRepository<Answer, Long>{

}
