package com.karan.backend.config;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtilities implements Serializable {
	private static final long serialVersionUID = 1L;

	public static final long JWT_TOKEN_VALIDITY = 5l * 60l * 60l;

	@Value("${jwt.passphrase}")
	private String passphrase;

	/**
	 * Retrieves Username from JWT Token
	 * 
	 * @return Username from JWT Token
	 */
	public String getUsernameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	/**
	 * Retrieves Expiration Date from JWT Token
	 * 
	 * @return Expiration Date from JWT Token
	 */
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	/**
	 * Retrieves Information from Token using the Secret Key
	 * 
	 * @return Body of the Token
	 */
	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(passphrase).parseClaimsJws(token).getBody();
	}

	/**
	 * Retrieves Information from Token using the Secret Key
	 * 
	 * @return Body of the Token
	 */
	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	/**
	 * Generates JWT Token
	 * 
	 * @return JWT Token
	 */
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		return doGenerateToken(claims, userDetails.getUsername());
	}

	/**
	 * Creation of JWT Token
	 * 1. Define claims of the token, like Issuer, Expiration, Subject, and the ID
	 * 2. Sign the JWT using the HS512 algorithm and secret key
	 * 3. Compaction of the JWT to a URL-safe string
	 * 
	 * @return JWT Token
	 */
	private String doGenerateToken(Map<String, Object> claims, String subject) {
		return Jwts.builder()
					.setClaims(claims)
					.setSubject(subject)
					.setIssuedAt(new Date(System.currentTimeMillis()))
					.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
					.signWith(SignatureAlgorithm.HS512, passphrase)
					.compact();
	}

	/**
	 * Validates the Token Details
	 * 
	 * @return Boolean
	 */
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = getUsernameFromToken(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

}