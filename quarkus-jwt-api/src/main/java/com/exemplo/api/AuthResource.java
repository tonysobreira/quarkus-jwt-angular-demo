package com.exemplo.api;

import com.exemplo.security.TokenService;
import com.exemplo.security.User;
import com.exemplo.security.UserService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/auth")
public class AuthResource {

	@Inject
	UserService userService;

	@Inject
	TokenService tokenService;

	private static final String TOKEN_KEY = "access_token";

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(Map<String, String> credentials) {
		String username = credentials.get("username");
		String password = credentials.get("password");

		User user = userService.findByUsername(username);

		// Em produção, use hashing!
		if (user != null && user.getPassword().equals(password)) {
			String token = tokenService.generateToken(username, user.getRoles());
			return Response.ok(Map.of(TOKEN_KEY, token)).build();
		} else {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
	}

}