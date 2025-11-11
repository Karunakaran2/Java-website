package com.karan.backend.portal.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "careers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Careers {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 1000)
	private String title;

	@Lob
	@Column(name = "job_description")
	private String jobDescription;

	@Column(length = 1, name = "active_status")
	private String activeStatus = "Y";

	@Column(name = "posting_date")
	private LocalDate postingDate;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(name = "last_date")
	private LocalDate lastDate;

	@Lob
	@Column(name = "skill_set")
	private String skillSet;

	@Column(updatable = false, name = "created_at")
	private LocalDate createdAt;

	@Column(name = "updated_at")
	private LocalDate updatedAt;

	@Column(length = 500)
	private String department;

	@Column(length = 45, name = "job_type")
	private String jobType;

	@Lob
	private String experience;

	@Column(length = 500)
	private String location;

	@Column(length = 45, name = "gender_preference")
	private String genderPreference;

	@Column(length = 45, name = "no_of_vacancies")
	private String noOfVacancies;

	@Lob
	private String requirements;

	@Lob
	private String responsibilities;

	@Lob
	private String education;

	@Lob
	@Column(name = "additional_tags")
	private String additionalTags;

	@Column(length = 45, name = "delete_status")
	private String deleteStatus = "N";

	// JPA lifecycle hooks
	@PrePersist
	protected void onCreate() {
		this.createdAt = LocalDate.now();
		this.updatedAt = LocalDate.now();

		if (this.postingDate == null) {
			this.postingDate = this.createdAt;
		}
	}


	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = LocalDate.now();
	}
}
