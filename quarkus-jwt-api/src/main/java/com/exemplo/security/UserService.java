package com.exemplo.security;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@ApplicationScoped
public class UserService {

	private Map<String, User> users = new HashMap<>();

	public UserService() {
		// Usuários de exemplo (em produção, use banco de dados e hash de senhas)
		users.put("admin", new User("admin", "admin123", Set.of("ADMIN")));
		users.put("user", new User("user", "user123", Set.of("USER")));
	}

	public User findByUsername(String username) {
		return users.get(username);
	}

}