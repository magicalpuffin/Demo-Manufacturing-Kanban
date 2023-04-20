# Composes the local version
. ps-scripts/env.ps1

docker compose --file docker/docker-compose.yml --project-name $($PROJECT_NAME) up