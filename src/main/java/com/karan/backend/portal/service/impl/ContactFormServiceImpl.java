package com.karan.backend.portal.service.impl;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.karan.backend.portal.entities.ContactForm;
import com.karan.backend.portal.repo.ContactFormRepository;
import com.karan.backend.portal.service.ContactFormService;

@Service
public class ContactFormServiceImpl implements ContactFormService {

	@Autowired
	private ContactFormRepository contactFormRepository;

	@Override
	public ContactForm saveContact(ContactForm contactForm) {
		return contactFormRepository.save(contactForm);
	}

	@Override
	public List<ContactForm> getAllContactsSortedByRecent() {
		return contactFormRepository.findAllByOrderBySubmittedOnDesc();
	}

	@Override
	public List<ContactForm> getAllContactsFromLast3Days() {
		LocalDateTime threeDaysAgo = LocalDateTime.now().minusDays(3);
		Date threeDaysAgoDate = Date.from(threeDaysAgo.atZone(ZoneId.systemDefault()).toInstant());

		return contactFormRepository.findBySubmittedOnAfterOrderBySubmittedOnDesc(threeDaysAgoDate);
	}

}
