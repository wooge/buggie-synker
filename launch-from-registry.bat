docker compose down --rmi local --remove-orphans
docker compose pull
docker compose up -d --no-build