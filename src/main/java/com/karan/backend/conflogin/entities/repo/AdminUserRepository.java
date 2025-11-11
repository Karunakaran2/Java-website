package com.karan.backend.conflogin.entities.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.karan.backend.conflogin.entities.AdminUser;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long>, JpaSpecificationExecutor<AdminUser> {

	Optional<AdminUser> findOneByUsername(String string);
	
	

}