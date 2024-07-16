#!/bin/bash

# Create Docker network
docker network create dataherald_network

# Bring up services with Docker Compose
docker compose -p dataherald -f services/engine/docker-compose.yml up --build -d
docker compose -p dataherald -f services/enterprise/docker-compose.yml up --build -d
docker compose --env-file services/admin-console/.env.local -p dataherald -f services/admin-console/docker-compose.yml up --build -d
docker compose -p dataherald -f services/nginx/docker-compose.yml up --build -d

docker compose -p dataherald -f services/nginx/docker-compose.yml up --build -d