package com.example.models;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Incident {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@Basic(optional=false)
	@Column(insertable=false,columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
	
	private String description;
	
	private int priority;
	
	private int urgency;
	
	private int reportMethod;
	
	private int contactMethod;
	
	@Column(nullable=true)
	private int repetition;
	
	@ManyToOne
	private RegisteredUser evidenterUser;
	
	@ManyToOne
	private Status status;
	
	@ManyToOne
	private Service service;
	
	@Temporal(TemporalType.DATE)
	private Date closedTimeDate;
	
	@Temporal(TemporalType.DATE)
	private Date fixedTimeDate;
	
	@ManyToOne
	private Incident incident;
	
	@ManyToOne
	private Department department;
	
	@ManyToOne
	private RegisteredUser user;	
	
	private String title;
	
	private long taken;

	public RegisteredUser getEvidenterUser() {
		return evidenterUser;
	}

	public void setEvidenterUser(RegisteredUser evidenterUser) {
		this.evidenterUser = evidenterUser;
	}

	public int getRepetition() {
		return repetition;
	}

	public void setRepetition(int repetition) {
		this.repetition = repetition;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public int getUrgency() {
		return urgency;
	}

	public void setUrgency(int urgency) {
		this.urgency = urgency;
	}

	public int getReportMethod() {
		return reportMethod;
	}

	public void setReportMethod(int reportMethod) {
		this.reportMethod = reportMethod;
	}

	public int getContactMethod() {
		return contactMethod;
	}

	public void setContactMethod(int contactMethod) {
		this.contactMethod = contactMethod;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public Date getClosedTimeDate() {
		return closedTimeDate;
	}

	public void setClosedTimeDate(Date closedTimeDate) {
		this.closedTimeDate = closedTimeDate;
	}

	public Date getFixedTimeDate() {
		return fixedTimeDate;
	}

	public void setFixedTimeDate(Date fixedTimeDate) {
		this.fixedTimeDate = fixedTimeDate;
	}

	public Incident getIncident() {
		return incident;
	}

	public void setIncident(Incident incident) {
		this.incident = incident;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	
	public RegisteredUser getUser() {
		return user;
	}

	public void setUser(RegisteredUser user) {
		this.user = user;
	}

	public long getTaken() {
		return taken;
	}

	public void setTaken(long taken) {
		this.taken = taken;
	}

	public Incident(){
		
	}
}
