package com.exemplo.security;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.jwt.Claims;

import java.util.Set;

@ApplicationScoped
public class TokenService {

	public String generateToken(String username, Set<String> roles) {
		// Usa a chave privada configurada
		return Jwt.issuer("https://exemplo.com/issuer").upn(username).groups(roles)
				.claim(Claims.full_name.name(), username).sign();
	}

}