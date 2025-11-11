package com.karan.backend.portal.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(schema = "react_website", catalog = "react_website", name = "events")
@NoArgsConstructor
@AllArgsConstructor
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	
	private String brief;

	@Column(length = 500)
	private String description;

	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	@Column(name = "event_date")
	private LocalDateTime eventDate;

	private String location;
	
	@Column(name = "icon_path_name")
	private String iconPathName;
	
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
	
	@Column(name = "disable_status")
	private String disableStatus = "N";
	
	@Column(name = "delete_status")
	private String deleteStatus = "N";
	
	private String type;

	@Column(name = "registration_url")
	private String registrationUrl;

	@Column(length = 500)
	private String methodologies;

	@Column(name = "support_contact")
	private String supportContact;

}
