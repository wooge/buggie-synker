for /f "usebackq tokens=1,2 delims==" %%a in (".env") do (
    set "%%a=%%b"
)

set COMPOSE_PROFILES=%MUSIC_SERVER%
docker compose down --rmi all --volumes --remove-orphans
docker compose pull
docker compose up -d --no-build