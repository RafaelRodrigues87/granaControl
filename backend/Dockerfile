# Imagem base que já vem com Java 21 instalado
FROM eclipse-temurin:21-jdk-alpine

# Define a pasta principal dentro do container
# Tudo será executado dentro de /app
WORKDIR /app

# Copia o arquivo .jar da pasta target da sua máquina
# para dentro do container com o nome app.jar
COPY target/*.jar app.jar

# Informa que a aplicação usa a porta 8080
EXPOSE 8080

# Comando que será executado quando o container iniciar
# Equivalente a: java -jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]