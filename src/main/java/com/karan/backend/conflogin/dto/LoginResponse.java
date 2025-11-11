package com.karan.backend.conflogin.dto;

import lombok.Data;

@Data
public class LoginResponse {
	private String token;
	private UserBean userBean;
 
	public LoginResponse(String token, UserBean userBean) {
		this.token = token;
		this.userBean = userBean;
	}


	}
