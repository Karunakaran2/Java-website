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
@Table(schema = "react_website", catalog = "react_website", name = "login_sessions")
@Data
public class LoginSessions {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "user_seat_id")
	private Long userSeatId;
	@Column(name = "user_type")
	private String userType;
	@Column(name = "session_id")
	private String sessionId;
	@Column(name = "ip")
	private String ip;
	@Column(name = "os")
	private String os;
	@Column(name = "browser")
	private String browser;
	@Column(name = "login_time")
	private Date loginTime;
	@Column(name = "logout_time")
	private Date logoutTime;
	@Column(name = "logout_type")
	private String logoutType;

}