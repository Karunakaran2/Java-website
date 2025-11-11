package com.karan.backend.conflogin.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(schema = "react_website", catalog = "react_website", name = "admin_user")
@Data
public class AdminUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "role")
	private String role;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "full_name")
	private String fullName;
	
	@Column(name = "email")
	private String email;
	
	
	@Column(name = "mobile")
	private String mobile;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "title_name")
	private String titleName;
	
	@Column(name = "emp_id")
	private String employeeId;
	
	@Column(name = "active_status")
	private String activeStatus;
	
	@Column(name = "active_date")
	private Date activeDate;
	
	@Column(name = "deactive_date")
	private Date deactiveDate;
	
	@Column(name = "login_created_on")
	private Date loginCreatedOn;
	
	@Column(name = "designation")
	private String designation;
	

}
