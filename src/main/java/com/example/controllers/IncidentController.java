package com.example.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Department;
import com.example.models.Incident;
import com.example.models.Service;
import com.example.models.Status;
import com.example.repositories.DepartmentRepository;
import com.example.repositories.IncidentRepository;
import com.example.repositories.ServiceRepository;
import com.example.repositories.StatusRepository;

@RestController
@RequestMapping("/incidents")
public class IncidentController {
	
	@Autowired
	private IncidentRepository ir;
	
	@Autowired 
	private ServiceRepository servicer;
	
	@Autowired
	private StatusRepository statusr;
	
	@Autowired 
	private DepartmentRepository departmentr;
	
	//bolje bi bilo da je u kontroleru za service pa bi bilo "/services/id/addIncident" na konkretnu uslugu
	@RequestMapping("/service/{id}/addIncident")
	public void addIncident(@PathVariable("id") long id, @RequestBody IncidentBody inc) throws Exception
	{
		Service ser=servicer.findById(id);
		
		if(ser.getDescription()==null)
		{
			throw new Exception("Usluga za koju se prijavljuje incident nije aktivna.");
		}
		
		if(inc.description==null)
		{
			throw new Exception("Trazena polja za unos incidenta nisu ispravno popunjena.");
		}
		
		Incident novi=new Incident();
		novi.setDescription(inc.description);
		novi.setService(ser);
		novi.setCreated(new Date()); //stavice na sadasnje vrijeme
		novi.setContactMethod(inc.contactMethod);
		novi.setReportMethod(inc.reportMethod);
		if(inc.title!=null) novi.setTitle(inc.title);
		
		ir.save(novi);
	}
	
	@RequestMapping("/{id}/delete")
	public void deleteIncident(@PathVariable("id") long id) throws Exception
	{
		Incident i=ir.findById(id);
		
		if(i.getDescription()==null)
		{
			throw new Exception("Ne postoji incident sa tim id-em");
		}
		
		ir.delete(i);
	}
	
	@RequestMapping("/{id}/changeStatus/{status}") //status je string
	public void changeIncidentStatus(@PathVariable("id") long id,@PathVariable("status") String status) throws Exception
	{
		Incident i=ir.findById(id);
		
		if(i.getDescription()==null)
		{
			throw new Exception("Ne postoji incident sa tim id-em");
		}
		
		Status s=statusr.findByStatus(status);
		
		if(s.getStatus()==null)
		{
			throw new Exception("Ne postoji taj status");
		}
		
		i.setStatus(s);
		ir.save(i);	
	}
	
	@RequestMapping ("/{id}/changePriority/{priority}")
	public void changeIncidentPriority(@PathVariable("id") long id, @PathVariable("priority") int priority) throws Exception
	{
		Incident i=ir.findById(id);
		
		if(i.getDescription()==null)
		{
			throw new Exception("Ne postoji incident sa tim id-em");
		}
		
		if(priority<1 || priority>5) 
		{
			throw new Exception("Prioritet mora biti veci ili jednak 1 i manji ili jednak 5");
		}
		
		i.setPriority(priority);
		ir.save(i);	
	}
	
	@RequestMapping ("/{id}/changeUrgency/{urgency}")
	public void changeIncidentUrgency(@PathVariable("id") long id, @PathVariable("urgency") int urgency) throws Exception
	{
		Incident i=ir.findById(id);
		
		if(i.getDescription()==null)
		{
			throw new Exception("Ne postoji incident sa tim id-em");
		}
		
		if(urgency<1 || urgency>5) 
		{
			throw new Exception("Hitnost mora biti veca ili jednaka 1 i manja ili jednaka 5");
		}
		
		i.setUrgency(urgency);
		ir.save(i);	
	}
	
	@RequestMapping ("/{id}/closeIncident")
	public void closeIncident(@PathVariable("id") long id) throws Exception
	{
		Incident i=ir.findById(id);
		
		if(i.getDescription()==null)
		{
			throw new Exception("Ne postoji incident sa tim id-em");
		}
			
		i.setClosedTimeDate(new Date());
		ir.save(i);	
	}
	
	@RequestMapping ("/{id}/fixIncident")
	public void fixIncident(@PathVariable("id") long id) throws Exception
	{
		Incident i=ir.findById(id);
		
		if(i.getDescription()==null)
		{
			throw new Exception("Ne postoji incident sa tim id-em");
		}
		
		i.setFixedTimeDate(new Date());
		ir.save(i);	
	}
	
	@RequestMapping ("/{id}/addDepartment/{department}")
	public void addIncidentDepartment(@PathVariable("id") long id, @PathVariable("department") String department) throws Exception
	{
		Incident i=ir.findById(id);
		
		if(i.getDescription()==null)
		{
			throw new Exception("Ne postoji incident sa tim id-em");
		}
		
		Department d=departmentr.findByName(department);
		
		if(d.getName()==null)
		{
			throw new Exception("Ne postoji to odjeljenje.");
		}	
		
		i.setDepartment(d);
		ir.save(i);	
	}
	
	//incident na incident
	@RequestMapping ("/{id}/addIncident")
	public void addIncidentIncident(@PathVariable("id") long id, @RequestBody IncidentBody inc) throws Exception
	{
		Incident i=ir.findById(id);
		
		if(i.getDescription()==null)
		{
			throw new Exception("Ne postoji incident sa tim id-em");
		}
		
		Incident novi=new Incident();
		novi.setDescription(inc.description);
		novi.setContactMethod(inc.contactMethod);
		novi.setReportMethod(inc.reportMethod);
		if(inc.title!=null) novi.setTitle(inc.title);
		novi.setIncident(i);
		
		ir.save(novi);	
	}
	
	@SuppressWarnings("unused")
	private static class IncidentBody{
		public String description;
		public int reportMethod;		
		public int contactMethod;
		public String title;
	}	
}