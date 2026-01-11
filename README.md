\##Swagger

JSON do OpenAPI
http://localhost:8080/q/openapi
Interface gráfica
http://localhost:8080/q/swagger-ui



\##End points:

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



GET
http://localhost:8080/hello





\##API



\#Gerar chaves:



openssl genrsa -out privateKey.pem 2048

openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in privateKey.pem -out privateKey-pkcs8.pem

mv privateKey-pkcs8.pem privateKey.pem

openssl rsa -in privateKey.pem -out publicKey.pem -pubout









