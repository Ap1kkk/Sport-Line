FROM gradle:jdk21-alpine AS builder

WORKDIR /app
COPY . .
RUN gradle build --no-daemon -x test

FROM openjdk:21-slim-buster

WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
#LABEL org.opencontainers.image.source=https://github.com/Ap1kkk/Sport-Line