package com.karan.backend.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.Careers;

@Repository
public interface CareerRepository extends JpaRepository<Careers, Long>{

	List<Careers> findByActiveStatusAndDeleteStatusOrderByPostingDateDesc(String string, String string2);

}
