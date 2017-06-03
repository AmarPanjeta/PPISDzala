package com.example.controllers;

import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;

import com.example.models.*;
import com.example.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/incidents")
public class IncidentController {
	
	@Autowired
	private IncidentRepository ir;
	@Autowired
	private ServiceRepository sr;
	@Autowired
	private UserServiceRepository usr;

	@Autowired 
	private ServiceRepository servicer;
	@Autowired
	private UserRepository userr;
	
	@Autowired
	private StatusRepository statusr;
	
	@Autowired 
	private DepartmentRepository departmentr;
	
	@Autowired
	private AnswerRepository ar;
	
	private RequestRepository rr;
	
	//bolje bi bilo da je u kontroleru za service pa bi bilo "/services/id/addIncident" na konkretnu uslugu
	@RequestMapping("/service/{idservice}/{iduser}/addIncident")
	public Incident addIncident(@PathVariable("idservice") long idservice, @PathVariable("iduser") long iduser, @RequestBody IncidentBody inc) throws Exception
	{
		Service ser=servicer.findById(idservice);
		RegisteredUser user=userr.findById(iduser);
		Status status=statusr.findByStatus("created");
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
		novi.setUser(user);
		novi.setStatus(status);
		novi.setCreated(new Date()); //stavice na sadasnje vrijeme
		novi.setContactMethod(inc.contactMethod);
		novi.setReportMethod(inc.reportMethod);
		if(inc.title!=null) novi.setTitle(inc.title);
		
		return ir.save(novi);
	}
	
	@RequestMapping("/reportincident")
	public void reportIncident(@RequestBody UserIncidentBody tijelo) throws ServletException{
		RegisteredUser user=userr.findById(tijelo.userId);
		Service service=servicer.findById(tijelo.serviceId);
		Status status=statusr.findByStatus("Nerijesen");
		Department d=departmentr.findByName("Incident management");
		
		if(service.isAvailable()==false){
			throw new ServletException("Usluga nije aktivna");
		}
		
		if(tijelo.description==null || tijelo.description.equals("")){
			throw new ServletException("Nedostaje opis incidenta");
		}
		
		if(tijelo.title==null || tijelo.title.equals("")){
			throw new ServletException("Nedostaje naziv incidenta");
		}
		
		
		if(usr.isUserOfService(user, service)==0){
			throw new ServletException("Ne mozete prijaviti incident za uslugu ciji niste korisnik");
		}
		
		Incident i= new Incident();
		i.setContactMethod(tijelo.contactMethod);
		i.setCreated(new Date());
		i.setDescription(tijelo.description);
		i.setPriority(0);
		i.setRepetition(0);
		i.setReportMethod(3);
		i.setTitle(tijelo.title);
		i.setUrgency(0);
		i.setDepartment(d);
		i.setEvidenterUser(user);
		i.setService(service);
		i.setStatus(status);
		i.setUser(user);
		i.setTaken(0);
		
		ir.save(i);
		
		
	} 

	@RequestMapping(value = "/userIncident", method = RequestMethod.GET)
	@ResponseBody
	public List<Incident> findIncidentsByUserId(@RequestParam("userid") Long id) {
		RegisteredUser user=userr.findById(id);
		return ir.getByUser(user);
	}

	@RequestMapping(value = "/services", method = RequestMethod.GET)
	@ResponseBody
	public Iterable<Service> findServices() {

		return sr.findAll();
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
	
	@RequestMapping("/all")
	public List<Incident> all(){
		return (List<Incident>) ir.findAll();
	}
	
	@RequestMapping("/closed")
	public List<Incident> getClosedIncidents(){
		return (List<Incident>) ir.getClosedIncidents();
	}
	
	@RequestMapping("/active")
	public List<Incident> getActiveIncidents(){
		return (List<Incident>) ir.getActiveIncidents();
	}
	
	@RequestMapping("/dodaj")
	public void dodaj(@RequestBody Incident i ){
		Incident inc=new Incident();
		Status s=statusr.findByStatus("Nerijesen");
		
		
		inc.setUser(i.getUser());
		inc.setTitle(i.getTitle());
		inc.setEvidenterUser(i.getEvidenterUser());
		inc.setRepetition(i.getRepetition());
		inc.setPriority(i.getPriority());
		inc.setStatus(s);
		inc.setDepartment(i.getDepartment());
		inc.setService(i.getService());
		inc.setContactMethod(i.getContactMethod());
		inc.setReportMethod(i.getReportMethod());
		inc.setDescription(i.getDescription());
		inc.setUrgency(i.getUrgency());
		inc.setTaken(0);
		
		ir.save(inc);
	}
	
	@RequestMapping("/getincidentbyid")
	public Incident getIncidentById(@RequestParam("id") long id){
		return ir.findById(id);
	}
	
	@RequestMapping("/getmainincidents")
	public List<Incident> getMainIncidents(){
		return (List<Incident>) ir.getMainIncidents();
	}
	
	@RequestMapping("/getanswerbyincident")
	public List<Answer> getAnswersByIncidentId(@RequestParam("id") long id){
		return (List<Answer>) ar.getAnswerByIncidentId(id);
	}
	
	@RequestMapping("getworkeranswerbyincident")
	public List<Answer> getWorkerAnswerByIncidentId(@RequestParam("id") long id){
		return (List<Answer>)ar.getWorkerAnswerByIncidentId(id);
	}
	
	@RequestMapping("/take")
	public void takeIncident(@RequestParam("id") long id,@RequestParam("idUser") long idUser){
		Incident i=ir.findById(id);
		i.setTaken(idUser);
		ir.save(i);
	}
	
	@RequestMapping("/release")
	public void releaseIncident(@RequestParam("id") long id){
		Incident i=ir.findById(id);
		i.setTaken(0);
		ir.save(i);
	}
	
	@RequestMapping("/stats")
	public StatsResponse stats(){
		StatsResponse sr = new StatsResponse();
		sr.number=ir.countIncidents();
		sr.fixed=ir.countClosedIncidents();
		sr.open=ir.countActiveIncidents();
		sr.falseIncidents=0;
		return sr;
	}
	
	@RequestMapping("/yearlystatistics")
	public StatisticsResponse yearlyStatistics(@RequestParam("year") int year){
		StatisticsResponse body=new StatisticsResponse();
		body.all=this.yearly(year);
		body.active=this.yearlyActive(year);
		body.closed=this.yearlyClosed(year);
		
		return body;
	}
	
	@RequestMapping("/monthlystatistics")
	public StatisticsResponse yearlyStatistics(@RequestParam("year") int year,@RequestParam("month") int month){
		StatisticsResponse body=new StatisticsResponse();
		body.all=this.monthly(year, month);
		body.active=this.monthlyactive(year, month);
		body.closed=this.monthlyclosed(year, month);
		
		return body;
	}
	
	@RequestMapping("/yearlyall")
	public int yearly(@RequestParam("year") int year){
		Date d1=new Date();
		d1.setYear(year-1900);
		d1.setDate(1);
		d1.setMonth(0);
		System.out.println(d1);
		
		Date d2=new Date();
		d2.setYear(year-1900);
		d2.setDate(5);
		d2.setMonth(11);
		d2.setDate(31);
		System.out.println(d2);
		
		return ir.countIncidentsByDate(d1, d2);
		
	}
	
	@RequestMapping("/monthlyall")
	public int monthly(@RequestParam("year") int year,@RequestParam("month") int month){
		int niz[]={31,28,31,30,31,30,31,31,30,31,30,31};
		Date d1=new Date();
		d1.setYear(year-1900);
		d1.setDate(1);
		d1.setMonth(month-1);
		System.out.println(d1);
		
		Date d2=new Date();
		d2.setYear(year-1900);
		d2.setDate(5);
		d2.setMonth(month-1);
		
		d2.setDate(niz[month-1]);
		System.out.println(d2);
		
		return ir.countIncidentsByDate(d1, d2);
		
	}
	
	@RequestMapping("/yearlyclosed")
	public int yearlyClosed(@RequestParam("year") int year){
		Date d1=new Date();
		d1.setYear(year-1900);
		d1.setDate(1);
		d1.setMonth(0);
		System.out.println(d1);
		
		Date d2=new Date();
		d2.setYear(year-1900);
		d2.setDate(5);
		d2.setMonth(11);
		d2.setDate(31);
		System.out.println(d2);
		
		return ir.countClosedIncidentsByDate(d1, d2);
		
	}
	
	@RequestMapping("/monthlyclosed")
	public int monthlyclosed(@RequestParam("year") int year,@RequestParam("month") int month){
		int niz[]={31,28,31,30,31,30,31,31,30,31,30,31};
		Date d1=new Date();
		d1.setYear(year-1900);
		d1.setDate(1);
		d1.setMonth(month-1);
		System.out.println(d1);
		
		Date d2=new Date();
		d2.setYear(year-1900);
		d2.setDate(5);
		d2.setMonth(month-1);
		
		d2.setDate(niz[month-1]);
		System.out.println(d2);
		
		return ir.countClosedIncidentsByDate(d1, d2);
		
	}
	
	@RequestMapping("/yearlyactive")
	public int yearlyActive(@RequestParam("year") int year){
		Date d1=new Date();
		d1.setYear(year-1900);
		d1.setDate(1);
		d1.setMonth(0);
		System.out.println(d1);
		
		Date d2=new Date();
		d2.setYear(year-1900);
		d2.setDate(5);
		d2.setMonth(11);
		d2.setDate(31);
		System.out.println(d2);
		
		return ir.countActiveIncidentsByDate(d1, d2);
		
	}
	
	@RequestMapping("/monthlyactive")
	public int monthlyactive(@RequestParam("year") int year,@RequestParam("month") int month){
		int niz[]={31,28,31,30,31,30,31,31,30,31,30,31};
		Date d1=new Date();
		d1.setYear(year-1900);
		d1.setDate(1);
		d1.setMonth(month-1);
		System.out.println(d1);
		
		Date d2=new Date();
		d2.setYear(year-1900);
		d2.setDate(5);
		d2.setMonth(month-1);
		
		d2.setDate(niz[month-1]);
		System.out.println(d2);
		
		return ir.countActiveIncidentsByDate(d1, d2);
		
	}
	
	@RequestMapping("/convert/{id}")
	public void convert(@PathVariable("id") long id){
		
		Incident i=ir.findById(id);
		Request r=new Request();
		
		r.setTitle(i.getTitle());
		r.setDescription(i.getDescription());
		r.setCreated(i.getCreated());
		r.setContactMethod(i.getContactMethod());
		r.setReportMethod(i.getReportMethod());
		r.setUser(i.getUser());
		r.setDepartment(i.getDepartment());
		r.setPriority(i.getPriority());
		r.setUrgency(i.getUrgency());
		r.setStatus(statusr.findByStatus("Poslan"));
		i.setStatus(statusr.findByStatus("Pogresno prijavljen"));
		ir.save(i);
		rr.save(r);
		
	}
	
	@SuppressWarnings("unused")
	private static class IncidentBody{
		public String description;
		public int reportMethod;		
		public int contactMethod;
		public String title;
	}	
	
	@SuppressWarnings("unused")
	private static class UserIncidentBody{
		public long userId;
		public long serviceId;
		public String title;
		public String description;
		public int contactMethod;
	}
	
	
	@SuppressWarnings("unused")
	private static class StatsResponse{
		public int number;
		public int fixed;
		public int open;
		public int falseIncidents;
	}	
	
	@SuppressWarnings("unused")
	public static class StatisticsResponse{
		public int active;
		public int closed;
		public int all;
	}
}
