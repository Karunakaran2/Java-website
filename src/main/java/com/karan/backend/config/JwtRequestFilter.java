package com.karan.backend.config;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.karan.backend.conflogin.service.impl.CustomLoginServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
	@Autowired
	private CustomLoginServiceImpl customLoginServiceImpl;
	@Autowired
	private JwtTokenUtilities jwtTokenUtilities;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		final String requestTokenHeader = request.getHeader("Authorization");

		String jwtToken = null;
		String username = null;

		if (requestTokenHeader != null && !requestTokenHeader.isBlank()) {
			if (requestTokenHeader.startsWith("Bearer ")) {
				jwtToken = requestTokenHeader.substring(7);
				try {
					username = jwtTokenUtilities.getUsernameFromToken(jwtToken);
				} catch (IllegalArgumentException e) {
					System.out.println("UNABLE TO GET JWT TOKEN");
				} catch (ExpiredJwtException e) {
					System.out.println("JWT TOKEN HAS EXPIRED");
				}
			}
		}

		if (username != null && !username.isBlank()) {
			if (SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = this.customLoginServiceImpl.loadUserByUsername(username);

				// ***IF TOKEN IS VALID,
				// ***CONFIGURE SPRING SECURITY TO MANUALLY SET AUTHENTICATION
				if (jwtTokenUtilities.validateToken(jwtToken, userDetails)) {
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
							userDetails, null, Collections.emptyList());
//						= new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
					usernamePasswordAuthenticationToken
							.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					// ***AFTER SETTING THE AUTHENTICATION IN THE CONTEXT,
					// ***SPECIFY THAT THE CURRENT USER IS AUTHENTICATED.
					// ***SO IT PASSES THE SPRING SECURITY CONFIGURATIONS SUCCESSFULLY
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
			}
		}

		chain.doFilter(request, response);
	}

}