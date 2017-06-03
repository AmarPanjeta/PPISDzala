package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.RequestAnswer;
import com.example.repositories.RequestAnswerRepository;
import com.example.repositories.RequestRepository;
import com.example.repositories.UserRepository;

@RequestMapping("/requestanswer")
@RestController
public class RequestAnswerController {
	
	@Autowired 
	RequestAnswerRepository rar;
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	RequestRepository rr;
	
	@RequestMapping("/getanswersbyrequest/{id}")
	public List<RequestAnswer> getAnswersByRequest(@PathVariable("id") long id){
		return rar.getAnswersByRequest(id);
	}
	
	@RequestMapping("/add")
	public void addAnswer(@RequestBody AnswerBody ab){
		
		RequestAnswer ra=new RequestAnswer();
		ra.setAutor(ur.findById(ab.autorId));
		ra.setRequest(rr.findById(ab.requestId));
		ra.setText(ab.text);
		rar.save(ra);
	}
	
	@SuppressWarnings("unused")
	private static class AnswerBody{
		public String text;
		public long autorId;
		public long requestId;
	}	
}
