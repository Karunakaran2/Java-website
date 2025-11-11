package com.karan.backend.portal.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(schema = "react_website", catalog = "react_website", name = "whitepapers")
public class Whitepaper {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	@Column(length = 500)
	private String description;

	@Column(name = "pdf_path_name")
	private String pdfPathName;

	@Column(name = "image_path_name")
	private String imagePathName;

	@Column(name = "published_date")
	private LocalDate publishedDate;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

	@Column(name = "disable_status")
	private String disableStatus = "N";
	
	@Column(unique = true)
	private String slug;

}