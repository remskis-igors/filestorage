# Use official OpenJDK image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory inside the container
WORKDIR /app

# Copy Maven build output (you must run `mvn package` first)
COPY target/fileStorage-0.0.1-SNAPSHOT.jar app.jar

# Expose application port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
