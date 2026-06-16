# Railway Deployment

The repository is ready to deploy from the repository root (`C:\diploma`).

## Quick Deploy

1. Push this repository to GitHub.
2. In Railway, create a new project.
3. Choose `Deploy from GitHub repo`.
4. Select this repository and deploy it.
5. After the deployment finishes, open the service `Settings` -> `Networking` and click `Generate Domain`.

Railway will use the root `railway.toml`, build the root `Dockerfile`, and run the Spring Boot app from `diploma-shop`.

## Required Variables

No variables are required for a diploma demo deploy. The Docker image starts the app with:

```text
SPRING_PROFILES_ACTIVE=prod
```

Railway provides `PORT` automatically. The production profile uses an in-memory H2 database by default and seeds demo products/events on startup.

## Optional PostgreSQL

For persistent data, add a Railway PostgreSQL service and set these variables on the app service:

```text
DB_URL=jdbc:postgresql://HOST:PORT/DB_NAME
DB_USERNAME=...
DB_PASSWORD=...
DB_DRIVER=org.postgresql.Driver
```

You can build `DB_URL` from the PostgreSQL service variables `PGHOST`, `PGPORT`, and `PGDATABASE`.
