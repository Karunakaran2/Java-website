package com.karan.backend.conflogin.service.impl;

import java.util.HashSet;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.karan.backend.conflogin.dto.UserBean;
import com.karan.backend.conflogin.entities.AdminUser;
import com.karan.backend.conflogin.entities.repo.AdminUserRepository;
import com.karan.backend.conflogin.service.CustomLoginService;

@Service
public class CustomLoginServiceImpl implements CustomLoginService {
	
	@Autowired
	AdminUserRepository adminUserRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		String[] usernameAndDomain = StringUtils.split(username, "$$");
		System.out.println(usernameAndDomain[0]);
				Optional<AdminUser> optionalOtr = adminUserRepository
						.findOneByUsername(usernameAndDomain[0]);
				if (optionalOtr.isPresent()) {
					AdminUser adUser = optionalOtr.get();
					System.out.println("from db: " + adUser.getFullName());
					return new User(username, adUser.getPassword(), new HashSet<GrantedAuthority>());
				}

		throw new UsernameNotFoundException("INVALID USER CREDENTIALS");
	}


	@Override
	public UserBean loadUserDetailsFromAdminUser(String username) {
		UserBean userBean = null;
		Optional<AdminUser> optionalUserSeat = adminUserRepository.findOneByUsername(username);
		if (!optionalUserSeat.isEmpty()) {
			userBean = new UserBean();
			AdminUser userSeat = optionalUserSeat.get();
			userBean.setOneTimeSeatUserAllotId(userSeat.getId());
			userBean.setUserId(userSeat.getId());
			userBean.setUserName(userSeat.getUsername());
		}
		return userBean;

	}

}
