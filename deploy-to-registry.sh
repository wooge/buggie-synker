# Docker compose base command to concatenate default and prod compose files.
dcc() {
  docker compose -f docker-compose.yaml -f docker-compose.prod.yaml "$@"
}

dcc down --rmi local --remove-orphans
dcc build
dcc push