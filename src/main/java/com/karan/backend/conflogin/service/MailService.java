package com.karan.backend.conflogin.service;

@FunctionalInterface
public interface MailService {

	void sendMail(String to, String cc, String subject, String htmlBody);
}
