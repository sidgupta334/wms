# WHAT's WMS?

WMS is a workforce management system developed on microservices based SPA web application that enables any mid to large scale organizations to manage their internal resources efficiently by allocating, rotating your resources based on the requirements of skills, locations etc. attributes based on employees skills and their aspirations choice

# Technologies Used:

## FRONTEND:

For developing frontend SPA, we use HTML5, CSS, Typescript language and React as rendering library with supporting stack like React Query (for state management and client side cache) and MUI Library (for styling and Material based components).

## BACKEND:

Primarily it uses Microservices architecture to decouple most of the services. The tech stack to build these services includes Java 17, Spring Boot, JPA, Hibernate, Spring Cloud (For API Gateway), Eureka (For service discovery), Keycloak (For authentication and authorization)

## DATASTORES:

- The persistent storage is done using MySQL database for different services.
- Server side caching is done using Redis.
- Searching and Recommendation is done using Elasticsearch.

# Local Setup

Since every component in this architecture is Dockerized, hence we have to first setup Docker on local.

- If using Windows, enable WSL2 for Windows by following https://learn.microsoft.com/en-us/windows/wsl/install. (Prefer Ubuntu to follow this documentation correctly).
- If you are using Ubuntu, use this to install `docker` and `docker compose` on your Ubuntu instance following this: https://docs.docker.com/engine/install/ubuntu/.
- As we use different MYSQL Databases for each service, hence install MySQL separately on your local machine by using this: https://dev.mysql.com/downloads/installer/
- Once MySQL is setup, run `db-init-setup.sql` in MySQL Workbench to setup different DB schemas required to run this application.
- Assuming Docker setup is done on Ubuntu instance, now copy the `docker-compose.yml` into the Linux instance and run `docker compose up --build -d` to spin up all the containers required.

# Network Details:

As this is a microservices based project, so different applications are running on separate ports, here are the details:

- REACT Frontend: Port: 3000
- Redis: Port: 6379
- MySQL: Port: 3306
- API Gateway: Port: 8080
- Eureka Service Discovery: Port: 8761 (This is also mapped in API Gateway, hence can be accessed at: http://localhost:8080/eureka/web)

# Future tasks for reference

- Although all microservices are Secured within API gateway, but they can still be accessed by random ports they are running on, hence we can secure each microservice project to avoid such security concerns.
- Use some credentials vault like Keeper to avoid exposing critical credentials like DB passwords, Lightcast API keys etc.
- Integrate logging and montoring using Elasticsearch, Kibana and Prometheus.
- Implement circuit breaker to quickly identify which service is not responding quickly.
- Integrate SSO based authentication mechanism for integrating wms with other applications within the organization.
