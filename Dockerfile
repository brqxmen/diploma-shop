FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /workspace/diploma-shop

COPY diploma-shop/.mvn .mvn
COPY diploma-shop/mvnw diploma-shop/pom.xml ./
RUN chmod +x mvnw && ./mvnw -B -DskipTests dependency:go-offline

COPY diploma-shop/src src
RUN ./mvnw -B -DskipTests package

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

ENV SPRING_PROFILES_ACTIVE=prod

COPY --from=build /workspace/diploma-shop/target/diploma-shop-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
