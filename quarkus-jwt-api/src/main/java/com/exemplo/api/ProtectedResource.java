package com.exemplo.api;

import org.eclipse.microprofile.jwt.JsonWebToken;

import com.exemplo.model.HelloResponse;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/protected")
public class ProtectedResource {

	@Inject
	JsonWebToken jwt;

	@GET
	@Path("/data")
	@RolesAllowed({ "ADMIN", "USER" })
	@Produces(MediaType.APPLICATION_JSON)
	public Response hello() {
		String message = "Olá, " + jwt.getName() + "! Você está autenticado.";
		return Response.ok(new HelloResponse(message, jwt.getName(), true)).build();
	}

	@GET
	@Path("/admin")
	@RolesAllowed("ADMIN")
	@Produces(MediaType.APPLICATION_JSON)
	public Response adminOnly() {
		String message = "Acesso apenas para admins!";
		return Response.ok(new HelloResponse(message, jwt.getName(), true)).build();
	}

}