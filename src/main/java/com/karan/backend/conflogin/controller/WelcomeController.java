package com.karan.backend.conflogin.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.logout.CookieClearingLogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.rememberme.AbstractRememberMeServices;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.karan.backend.conflogin.dto.UserBean;
import com.karan.backend.conflogin.service.CustomLoginService;

@Controller
@RequestMapping
@Scope("prototype")
public class WelcomeController {
	@Autowired
	SessionRegistry sessionRegistry;

	@Autowired
	CustomLoginService customLoginService;
	
	
	@GetMapping(value = "/admin/login")
	public String welcome(HttpSession session, @RequestParam(required = false) String seatId) {
		UserBean userBean = new UserBean();
		List<String> privilegesCodes = new ArrayList<>();
		userBean = (UserBean) session.getAttribute("userBean");
		return "login";
		/* return "redirect:/karanportal/gotokaranPortal"; */
	}

	@GetMapping(value = "/logoutOfAll")
	public String logoutOfAll(Principal principal) {

		User currentUser = null;
		for (Object object : sessionRegistry.getAllPrincipals()) {
			currentUser = (User) object;

			if (currentUser.getUsername().equals(principal.getName())) {
				List<SessionInformation> sessionInformations = sessionRegistry.getAllSessions(object, false);
				for (SessionInformation sessionInformation : sessionInformations) {
					sessionInformation.expireNow();
				}
			}
		}

		return "redirect:/login?error=5";

	}

	@GetMapping("/logout")
	public String logout(HttpServletRequest request, HttpServletResponse response,
			SecurityContextLogoutHandler logoutHandler) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		logoutHandler.logout(request, response, auth);
		new CookieClearingLogoutHandler(AbstractRememberMeServices.SPRING_SECURITY_REMEMBER_ME_COOKIE_KEY)
				.logout(request, response, auth);
		return "redirect:/karan";
	}

}
