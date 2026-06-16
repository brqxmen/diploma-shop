# Local IntelliJ Run

Use IntelliJ IDEA to run the Spring Boot app locally.

## Steps

1. Open `C:\diploma\diploma-shop` in IntelliJ IDEA.
2. Wait until Maven finishes indexing.
3. Open `src/main/java/com/example/diploma_shop/DiplomaShopApplication.java`.
4. Click Run on `DiplomaShopApplication`.
5. Open:

```text
http://localhost:8080
```

Admin panel:

```text
http://localhost:8080/admin
```

## Notes

The app now uses an in-memory H2 database by default, so PostgreSQL is not required for local demo startup.

If IntelliJ has old environment variables in the run configuration, remove:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
SPRING_PROFILES_ACTIVE
```
