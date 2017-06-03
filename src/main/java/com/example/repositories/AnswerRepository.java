package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Answer;
import com.example.models.Incident;

@RepositoryRestResource(path="answers",collectionResourceRel="answers")
public interface AnswerRepository extends CrudRepository<Answer, Long>{

	@Query("select a from Answer a,IncidentAnswer ia where ia.incident.id=:id and ia.answer=a order by a.created asc")
	public List<Answer> getAnswerByIncidentId(@Param("id") long id);
	
	@Query("select a from Answer a,IncidentAnswer ia where ia.incident.id=:id and ia.answer=a and a.autor.type!=0 order by a.created asc")
	public List<Answer> getWorkerAnswerByIncidentId(@Param("id") long id);
}
