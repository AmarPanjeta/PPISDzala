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
public class Request {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private int priority;
	
	private int reportMethod;
	
	private String description;
	
	private int contactMethod;
	
	private int urgency;
	
	private String title;
	
	@Basic(optional=false)
	@Column(insertable=false,columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
	
	@ManyToOne
	private Status status;
	@ManyToOne
	private RegisteredUser user;
	@ManyToOne
	private Department department;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public int getReportMethod() {
		return reportMethod;
	}

	public void setReportMethod(int reportMethod) {
		this.reportMethod = reportMethod;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getContactMethod() {
		return contactMethod;
	}

	public void setContactMethod(int contactMethod) {
		this.contactMethod = contactMethod;
	}

	public int getUrgency() {
		return urgency;
	}

	public void setUrgency(int urgency) {
		this.urgency = urgency;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
	
	public Request(){
		
	}

	public RegisteredUser getUser() {
		return user;
	}

	public void setUser(RegisteredUser user) {
		this.user = user;
	}
}
