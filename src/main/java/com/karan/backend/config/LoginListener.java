package com.karan.backend.config;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.authentication.event.LogoutSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionRegistry;

import com.karan.backend.conflogin.dto.UserBean;
import com.karan.backend.conflogin.entities.LoginSessions;
import com.karan.backend.conflogin.entities.repo.LoginSessionsRepository;
import com.karan.backend.conflogin.service.CustomLoginService;
import com.karan.backend.util.RequestClientDetails;

@Configuration
public class LoginListener {
	@Autowired
	CustomLoginService customLoginService;
	@Autowired
	private LoginSessionsRepository loginSessionDetailsRepository;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private SessionRegistry sessionRegistry;

	@Bean
	public ApplicationListener<AuthenticationSuccessEvent> onSuccessListener() {
		return (AuthenticationSuccessEvent event) -> {
			HttpSession session = request.getSession(true);
			Authentication authentication = event.getAuthentication();

			String[] usernameAndDomain = StringUtils.split(authentication.getName(), "$$");

			UserBean userBean = null;
			LoginSessions sessionDetails = new LoginSessions();
			userBean = customLoginService.loadUserDetailsFromAdminUser(usernameAndDomain[0]);
			/** LOAD-PRIVILEGES-FROM-DATABASE */
			/*
			 * List<String> privileges = Collections.emptyList();
			 * session.setAttribute("privileges", privileges);
			 */

			sessionDetails.setUserSeatId(userBean.getOneTimeSeatUserAllotId());
			sessionDetails.setUserType(userBean.getDomain());
			sessionDetails.setSessionId(request.getSession().getId());

			loginSessionDetailsRepository.save(sessionDetails);
			RequestClientDetails clientDetails = new RequestClientDetails(request);
			sessionDetails.setIp(clientDetails.getClientIP());
			sessionDetails.setOs(clientDetails.getClientOS());
			sessionDetails.setBrowser(clientDetails.getClientBrowser());
			sessionDetails.setLoginTime(new Date());

			loginSessionDetailsRepository.save(sessionDetails);

			sessionRegistry.registerNewSession(request.getSession().getId(), authentication.getPrincipal());
			session.setAttribute("userBean", userBean);
		};
	}

	@Bean
	public ApplicationListener<LogoutSuccessEvent> onLogoutListener() {
		return (LogoutSuccessEvent event) -> {
			System.out.println("LOGOUT LISTENER");
		};
	}

}
