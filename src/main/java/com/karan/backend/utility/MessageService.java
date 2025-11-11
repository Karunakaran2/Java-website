package com.karan.backend.utility;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@PropertySource(value = { "classpath:application-dev.properties" })
public class MessageService {
	private static boolean production;
	private static String localhostPath;
	private static String messageProtocol;

	private static boolean isProduction() {
		return production;
	}

	private static String getLocalhostPath() {
		return localhostPath;
	}

	public static String getMessageProtocol() {
		return messageProtocol;
	}

	@Autowired
	public MessageService(@Value("${host.domain}") String localhostPath,
			@Value("${message.protocol}") String protocol) {
		MessageService.localhostPath = localhostPath;
		MessageService.messageProtocol = protocol;
	}

	public static boolean sendMessage(String message, String recipient, String serviceProvider)
			throws UnknownHostException, UnsupportedEncodingException {
		boolean messageStatus = false;

//		uncomment this line when it is server
//		if (isProduction()) {
			RestTemplate restTemplate = new RestTemplate();

			MultiValueMap<String, String> uriParams;
			uriParams = new LinkedMultiValueMap<>();
			uriParams.add("message", URLEncoder.encode(message, StandardCharsets.UTF_8));
			uriParams.add("recipients", recipient);
			uriParams.add("provider", serviceProvider);

			UriComponents uriComponents = UriComponentsBuilder.newInstance().scheme(messageProtocol)
					.host(getLocalhostPath()).path("/message/sendMessage").queryParams(uriParams).build();

			ResponseEntity<?> messageResponse = restTemplate.getForEntity(uriComponents.toUriString(), Object.class);

			if (messageResponse.getStatusCode().equals(HttpStatus.OK)) {
				messageStatus = true;
			}
//		}

		return messageStatus;
	}

	public static boolean sendMail(String subject, String message, String attachment, String recipient)
			throws UnknownHostException, UnsupportedEncodingException {
		boolean messageStatus = false;

//		if (isProduction()) {
			RestTemplate restTemplate = new RestTemplate();

			MultiValueMap<String, String> uriParams;
			uriParams = new LinkedMultiValueMap<>();
			uriParams.add("subject", subject);
			uriParams.add("message", URLEncoder.encode(message, StandardCharsets.UTF_8));
			uriParams.add("recipients", recipient);
			uriParams.add("attachment", attachment);

			UriComponents uriComponents = UriComponentsBuilder.newInstance().scheme(messageProtocol)
					.host(getLocalhostPath()).path("/message/sendMail").queryParams(uriParams).build();

			ResponseEntity<?> messageResponse;
			try {
				messageResponse = restTemplate.getForEntity(uriComponents.toUriString(), Object.class);
				if (messageResponse.getStatusCode().equals(HttpStatus.OK)) {
					messageStatus = true;
				}
			} catch (RestClientException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

//		}

		return messageStatus;
	}

	public static boolean sendMailForVerify(String subject, String message, Long id, String recipient)
			throws UnknownHostException, UnsupportedEncodingException {
		boolean messageStatus = false;

		if (isProduction()) {
			RestTemplate restTemplate = new RestTemplate();

			MultiValueMap<String, String> uriParams;
			uriParams = new LinkedMultiValueMap<>();
			uriParams.add("subject", subject);
			uriParams.add("message", URLEncoder.encode(message, StandardCharsets.UTF_8));
			uriParams.add("recipients", recipient);

			UriComponents uriComponents = UriComponentsBuilder.newInstance().scheme(messageProtocol)
					.host(getLocalhostPath()).path("/message/sendMail").queryParams(uriParams).build();

			ResponseEntity<?> messageResponse = restTemplate.getForEntity(uriComponents.toUriString(), Object.class);

			if (messageResponse.getStatusCode().equals(HttpStatus.OK)) {
				messageStatus = true;
			}
		}

		return messageStatus;
	}

	public final class Provider {
		private Provider() {
			throw new IllegalStateException("UTILITY CLASS");
		}

	}

}