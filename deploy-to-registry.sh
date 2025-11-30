# Semicolon separating because running on Windows. Replace with colon on Linux/macOS.
export COMPOSE_FILE="docker-compose.yaml;docker-compose.prod.yaml"

docker compose down --rmi local --remove-orphans
docker compose build
docker compose push