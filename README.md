##Swagger

JSON do OpenAPI
http://localhost:8080/q/openapi
Interface gráfica
http://localhost:8080/q/swagger-ui

##end points:

POST
http://localhost:8080/auth/login
{
    "username": "admin",
    "password": "admin123"
}
{
    "username": "user",
    "password": "user123"
}

GET
http://localhost:8080/protected/data

GET
http://localhost:8080/protected/admin

