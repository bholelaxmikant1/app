package com.app.utils;

import java.util.Date;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil {

	public String generateToken(Map<String, String> map) {

		String email = map.get("email");
		String password = map.get("password");
		String role = map.get("role");

		return Jwts.builder().claim("email", email).claim("password", password).claim("role", role).setIssuer("Suyog")
				.setIssuedAt(new Date(System.currentTimeMillis())).signWith(SignatureAlgorithm.HS256, "suyog@123")
				.compact();

	}

	public String getEmailFromToken(String token) {
		Claims claims = getAllClaimsFromToken(token);
		return claims.get("email", String.class);
	}

	public String getPasswordFromToken(String token) {
		Claims claims = getAllClaimsFromToken(token);
		return claims.get("password", String.class);
	}

	public String getRoleFromToken(String token) {
		Claims claims = getAllClaimsFromToken(token);
		return claims.get("role", String.class);
	}

	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey("suyog@123").parseClaimsJws(token).getBody();
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		String email = getEmailFromToken(token);
		return (email.equals(userDetails.getUsername()));

	}
}
