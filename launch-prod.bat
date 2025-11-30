docker compose down --rmi local --remove-orphans
docker compose pull
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --no-build