package com.javainuse.dao;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OrderBy;
import javax.persistence.Table;

@Entity
@Table(name = "employee")
public class DAOEmployee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long empid;

	@Column
	private String project;
	
	@Column
	private String customer;

	@Column
	private String manager;

	@Column
	private String tstatus;

	@Column
	private String tools;

	@Column
	private String env;

	@Column
	@OrderBy("psdate ASC")
	private Date psdate;

	@Column
	private Date pedate;

	@Column
	private Date asdate;

	@Column
	private Date aedate;

	@Column
	private String cstatus;

	@Column
	private String resources;
	
	@Column
	private String today;

	@Column (columnDefinition="TEXT")
	private String remark;

	public long getEmpid() {
		return empid;
	}

	public void setEmpid(long empid) {
		this.empid = empid;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getTstatus() {
		return tstatus;
	}

	public void setTstatus(String tstatus) {
		this.tstatus = tstatus;
	}

	public String getTools() {
		return tools;
	}

	public void setTools(String tools) {
		this.tools = tools;
	}

	public String getEnv() {
		return env;
	}

	public void setEnv(String env) {
		this.env = env;
	}

	public Date getPsdate() {
		return psdate;
	}

	public void setPsdate(Date psdate) {
		this.psdate = psdate;
	}

	public Date getPedate() {
		return pedate;
	}

	public void setPedate(Date pedate) {
		this.pedate = pedate;
	}

	public Date getAsdate() {
		return asdate;
	}

	public void setAsdate(Date asdate) {
		this.asdate = asdate;
	}

	public Date getAedate() {
		return aedate;
	}

	public void setAedate(Date aedate) {
		this.aedate = aedate;
	}

	public String getCstatus() {
		return cstatus;
	}

	public void setCstatus(String cstatus) {
		this.cstatus = cstatus;
	}

	public String getResources() {
		return resources;
	}

	public void setResources(String resources) {
		this.resources = resources;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getToday() {
		return today;
	}

	public void setToday(String today) {
		this.today = today;
	}

}
