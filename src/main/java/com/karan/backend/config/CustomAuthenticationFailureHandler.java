package com.karan.backend.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
										HttpServletResponse response,
										AuthenticationException exception)
		throws IOException, ServletException {
		if(exception.getClass().isAssignableFrom(CredentialsExpiredException.class)) {
			response.sendRedirect("login?error=1");
		} else if(exception.getClass().isAssignableFrom(AuthenticationCredentialsNotFoundException.class)) {
			response.sendRedirect("login?error=2");
		} else if(exception.getClass().isAssignableFrom(BadCredentialsException.class)) {
			response.sendRedirect("login?error=3");
		} else if(exception.getClass().isAssignableFrom(UsernameNotFoundException.class)) {
			response.sendRedirect("login?error=3");
		} else if(exception.getClass().isAssignableFrom(LockedException.class)) {
			response.sendRedirect("login?error=4");
		} else {
			response.sendRedirect("login?error");
		}
	}
}