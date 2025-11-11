package com.karan.backend.portal.entities;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(schema = "react_website", catalog = "react_website", name = "contact_form")
public class ContactForm {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column
	private String name;
	
	@Column
	private String email;
	
	@Column
	private String company;
	
	@Column(name = "consulting_area")
	private String consultingArea;
	
	@Column
	private String message;
	
	@Column(name = "submitted_on")
	private Date submittedOn;
}
