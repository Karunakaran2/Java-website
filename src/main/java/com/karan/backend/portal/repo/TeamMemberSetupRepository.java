package com.karan.backend.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.TeamMemberSetup;

@Repository
public interface TeamMemberSetupRepository extends JpaRepository<TeamMemberSetup, Long> {

	List<TeamMemberSetup> findByLevelAndIsActiveAndIsDeleted(Integer level, String isActive, String isDeleted);

}
