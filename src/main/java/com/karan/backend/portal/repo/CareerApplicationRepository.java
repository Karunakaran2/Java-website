package com.karan.backend.portal.repo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.CareerApplication;

@Repository
public interface CareerApplicationRepository extends JpaRepository<CareerApplication, Long> {

	List<CareerApplication> findAllByOrderByAppliedOnDesc();

	@Query("SELECT ca FROM CareerApplication ca " + "WHERE (:careerId IS NULL OR ca.career.id = :careerId) "
			+ "AND (:startDate IS NULL OR ca.appliedOn >= :startDate) "
			+ "AND (:endDate IS NULL OR ca.appliedOn <= :endDate) " + "AND ca.deleteStatus = 'N' "
			+ "ORDER BY ca.appliedOn DESC")
	List<CareerApplication> findByFilters(@Param("careerId") Long careerId, @Param("startDate") LocalDate startDate,
			@Param("endDate") LocalDate endDate);

	@Query("SELECT c FROM CareerApplication c WHERE c.appliedOn >= :threeDaysAgo ORDER BY c.appliedOn DESC")
	List<CareerApplication> findAllFromLast3Days(@Param("threeDaysAgo") LocalDateTime threeDaysAgo);


}
