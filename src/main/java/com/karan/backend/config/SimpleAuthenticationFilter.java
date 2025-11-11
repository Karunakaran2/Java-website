package com.karan.backend.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class SimpleAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	public static final String SPRING_SECURITY_FORM_DOMAIN_KEY = "domain";
	public static final String SPRING_SECURITY_FORM_CAPTCHA_KEY = "captcha";
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		HttpSession session = request.getSession(true);
		
		String captchaFromSession = null;
		if (session.getAttribute("captcha") != null) {
			captchaFromSession = session.getAttribute("captcha").toString();
		} else {
			throw new CredentialsExpiredException("INVALID SESSION");
		}
		
		String captchaFromRequest = obtainCaptcha(request);
		if (captchaFromRequest == null) {
			throw new AuthenticationCredentialsNotFoundException("INVALID CAPTCHA");
		}
		
		if (!captchaFromRequest.equals(captchaFromSession)) {
			throw new AuthenticationCredentialsNotFoundException("INVALID CAPTCHA");
		}
		
		UsernamePasswordAuthenticationToken authRequest = getAuthRequest(request);
		System.out.println("***************************" + authRequest.getName() +"," + authRequest.getDetails()+ "*******************");
		setDetails(request, authRequest);

		return this.getAuthenticationManager().authenticate(authRequest);
	}

	private UsernamePasswordAuthenticationToken getAuthRequest(HttpServletRequest request) {
		String username = obtainUsername(request);
		String password = obtainPassword(request);
//		String domain = obtainDomain(request);
		
		if (username == null) {
			username = "";
		}
		if (password == null) {
			password = "";
		}
//		if (domain == null) {
//			domain = "";
//		}

//		String usernameDomain = String.format("%s%s%s", username.trim(), "$$", domain);
		return new UsernamePasswordAuthenticationToken(username, password);
	}
	
//	private String obtainDomain(HttpServletRequest request) {
//        return request.getParameter(SPRING_SECURITY_FORM_DOMAIN_KEY);
//    }
	
	private String obtainCaptcha(HttpServletRequest request) {
        return request.getParameter(SPRING_SECURITY_FORM_CAPTCHA_KEY);
    }

}