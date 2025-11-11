package com.karan.backend.portal.repo;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.karan.backend.portal.entities.ContactForm;

@Repository
public interface ContactFormRepository extends JpaRepository<ContactForm, Long> {

	List<ContactForm> findAllByOrderBySubmittedOnDesc();

	List<ContactForm> findBySubmittedOnAfterOrderBySubmittedOnDesc(Date date);

}
