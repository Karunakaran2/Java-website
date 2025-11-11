package com.karan.backend.conflogin.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.karan.backend.conflogin.dto.UserBean;


public interface CustomLoginService extends UserDetailsService {

	UserBean loadUserDetailsFromAdminUser(String username);
	
	UserDetails loadUserByUsername(String username);


}