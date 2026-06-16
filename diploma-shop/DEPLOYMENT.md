# Deploy STREET 19 To Railway

This project is a Spring Boot application, so use Railway instead of Vercel.

## What Is Already Prepared

- Root `Dockerfile` and root `railway.toml` let Railway deploy the repository directly from `C:\diploma`.
- `Dockerfile` builds and runs the Spring Boot jar.
- `railway.toml` tells Railway to use the Dockerfile and check `/` after startup.
- `application-prod.properties` uses the cloud `PORT` variable and an in-memory H2 database by default.
- `DemoDataSeeder` fills an empty production database with demo STREET 19 products and events.

## Railway Steps

1. Push the project to GitHub.
2. Open Railway and create a new project.
3. Choose `Deploy from GitHub repo`.
4. Select this repository.
5. Deploy the service. The root Railway config will build the Spring Boot app from `diploma-shop`.
6. Open the service settings, go to Networking, and click `Generate Domain`.
7. Use the generated public URL for the diploma presentation.

## Environment Variables

No variables are required for the quick demo deploy because the Dockerfile sets:

```text
SPRING_PROFILES_ACTIVE=prod
```

Railway provides `PORT` automatically.

## Optional Real Database

For a more realistic deploy, add a PostgreSQL service in Railway and set:

```text
DB_URL=jdbc:postgresql://HOST:PORT/DB_NAME
DB_USERNAME=...
DB_PASSWORD=...
DB_DRIVER=org.postgresql.Driver
```

For the diploma demo, the default H2 setup is enough: the shop loads products automatically and the checkout/admin order flow still works in the browser.
