package com.karan.backend.portal.service;

import java.util.List;

import com.karan.backend.portal.entities.ContactForm;

public interface ContactFormService {

	public ContactForm saveContact(ContactForm contactForm);
	
	public List<ContactForm> getAllContactsSortedByRecent();

	public List<ContactForm> getAllContactsFromLast3Days();
}
