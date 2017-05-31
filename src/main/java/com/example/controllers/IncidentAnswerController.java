package com.example.controllers;

import java.util.Date;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Answer;
import com.example.models.Department;
import com.example.models.Incident;
import com.example.models.IncidentAnswer;
import com.example.models.RegisteredUser;
import com.example.models.Status;
import com.example.repositories.AnswerRepository;
import com.example.repositories.IncidentAnswerRepository;
import com.example.repositories.IncidentRepository;
import com.example.repositories.UserRepository;

@RestController
@RequestMapping("/incidentanswers")
public class IncidentAnswerController {
	
	@Autowired
	IncidentAnswerRepository iar;
	
	@Autowired
	IncidentRepository ir;
	
	@Autowired
	AnswerRepository ar;
	
	@Autowired
	UserRepository ur;
	
	@RequestMapping("/add")
	public void addNew(@RequestBody AnswerBody odg){
		Incident i=ir.findById(odg.incId);
		RegisteredUser autor=ur.findById(odg.autorId);
		Answer a=new Answer();
		a.setAutor(autor);
		a.setText(odg.text);
		a=ar.save(a);
		IncidentAnswer nia=new IncidentAnswer();
		nia.setAnswer(a);
		nia.setIncident(i);
        iar.save(nia);		
		
	}
	
	@RequestMapping("/addbyid")
	public void addById(@RequestParam("incId") long incId,@RequestParam("ansId") long ansId){
		Incident i=ir.findById(incId);
		Answer a=ar.findOne(ansId);
		IncidentAnswer nia=new IncidentAnswer();
		nia.setAnswer(a);
		nia.setIncident(i);
        iar.save(nia);
		
	}
	
	@RequestMapping("/update")
	public void updateIncident(@RequestBody UpdateBody tijelo) throws Exception{
		Incident i=ir.findById(tijelo.id);
		i.setDescription(tijelo.description);
		i.setTitle(tijelo.title);
		i.setPriority(tijelo.prirority);
		i.setStatus(tijelo.status);
		i.setUrgency(tijelo.urgency);
		i.setDepartment(tijelo.department);
		if(tijelo.answer!=null || tijelo.answer.getText().isEmpty() || tijelo.answer.getText().equals("")){
			throw new Exception("Fali odgovor");
		}
		i.setRepetition(tijelo.repetition);
		if(tijelo.incident!=null){
			i.setIncident(tijelo.incident);
		}
		ir.save(i);
	}
	
	
	
	@RequestMapping("/edit")
	public void editIncident(@RequestBody EditBody tijelo){
		Incident i=ir.findById(tijelo.id);
		i.setDescription(tijelo.description);
		i.setTitle(tijelo.title);
		i.setPriority(tijelo.priority);
		i.setStatus(tijelo.status);
		i.setUrgency(tijelo.urgency);
		i.setDepartment(tijelo.department);
		ir.save(i);
		
	}
	
	@RequestMapping("/fix")
	public void fixIncident(@RequestBody FixBody tijelo){
		Incident i=ir.findById(tijelo.id);
		if(tijelo.answerText!=null && !tijelo.answerText.equals("") ){
			Answer a=new Answer();
			a.setText(tijelo.answerText);
			a.setAutor(ur.findById(tijelo.idAutora));
			a=ar.save(a);
			IncidentAnswer iao=new IncidentAnswer();
			i=ir.save(i);
			iao.setIncident(i);
			iao.setAnswer(a);
			iar.save(iao);
		}else{
			System.out.println("Fali tekst odgovora");
		}
		if(tijelo.incidentId!=-1){
			Incident povezaniInc=ir.findById(tijelo.incidentId);
			i.setIncident(povezaniInc);
			if(tijelo.answerId!=-1){
				Answer ap=ar.findOne(tijelo.answerId);
				IncidentAnswer po=new IncidentAnswer();
				po.setAnswer(ap);
				i=ir.save(i);
				po.setIncident(i);
				iar.save(po);
			}else{
				System.out.println("Fali odgovor od poveyanog inc");
			}
		}else{
			System.out.println("fali poveyani inc");
		}
		i.setClosedTimeDate(new Date());
		i.setFixedTimeDate(new Date());
		
		ir.save(i);
	}
	@SuppressWarnings("unused")
	private static class AnswerBody{
		public String text;
		public long autorId;
		public long incId;
	}	
	
	@SuppressWarnings("unused")
	private static class UpdateBody{
		public long id;
		public String description;
		public String title;
		public int prirority;
		public Status status;
		public int urgency;
		public Department department;
		public Answer answer;
		public int repetition;
		public Incident incident;
		public Answer incidentanswer;
		
	}
	
	
	@SuppressWarnings("unused")
	private static class EditBody{
		public long id;
		public String description;
		public String title;
		public int priority;
		public Status status;
		public int urgency;
		public Department department;
		
	}

	@SuppressWarnings("unused")
	private static class FixBody{
		//id incidenta
		public long id;
		//id autora
		public long idAutora;
		//tekst odgovora
		public String answerText;
		//povezani incident
		public long incidentId;
		//odgovor povezanog incidenta
		public long answerId;
		
	}
}
