package com.karan.backend.conflogin.entities.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.karan.backend.conflogin.entities.LoginSessions;


public interface LoginSessionsRepository extends JpaRepository<LoginSessions, Long> {

	LoginSessions findByLogoutTimeIsNotNullAndSessionId(String sessionId);

}
