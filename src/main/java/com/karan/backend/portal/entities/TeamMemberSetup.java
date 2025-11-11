package com.karan.backend.portal.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "team_members")
public class TeamMemberSetup {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String position;

	private String email;
	private String phone;

	@Column(name = "level")
	private Integer level; // 0 = CEO, 1 = VP, 2 = Manager, etc.

	@Column(name = "sort_order")
	private Integer sortOrder;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_id")
	private TeamMemberSetup parent; // Self-referencing relationship

	@Column(name = "created_at", updatable = false)
	private LocalDate createdAt = LocalDate.now();

	@Column(name = "updated_at")
	private LocalDate updatedAt = LocalDate.now();

	@PreUpdate
	public void preUpdate() {
		this.updatedAt = LocalDate.now();
	}

	@Column(name = "linkedin_url")
	private String linkedinUrl;
	@Column(name = "twitter_url")
	private String twitterUrl;
	@Column(name = "photo_url")
	private String photoUrl;

	@Column(name = "is_active")
	private String isActive = "Y";

	@Column(name = "is_deleted")
	private String isDeleted = "N";
}
