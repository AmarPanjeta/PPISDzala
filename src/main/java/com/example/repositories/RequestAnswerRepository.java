package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.models.RequestAnswer;

public interface RequestAnswerRepository extends CrudRepository<RequestAnswer, Long>{
	
	@Query("select ra from RequestAnswer ra where ra.request.id=:id order by ra.created ASC")
	public List<RequestAnswer> getAnswersByRequest(@Param("id") long id);

}
