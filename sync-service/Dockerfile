FROM python:3.15.0a1-slim

WORKDIR /

# Updating package index
RUN apt-get update
# Install ffmpeg
RUN apt-get install -y --no-install-recommends ffmpeg
# Install cron
RUN apt-get install -y cron
# Install dos2unix (converts line endings)
RUN apt-get install -y --no-install-recommends dos2unix
# Install socat (lightweight server listener)
RUN apt-get install -y socat

# Installing deno (js runtime for yt-dlp) and linked necessary packages
RUN apt-get install -y curl unzip
RUN curl -fsSL https://deno.land/install.sh | sh
RUN ln -s /root/.deno/bin/deno /usr/local/bin/deno
RUN apt-get remove -y curl unzip
RUN apt-get autoremove -y

# Clean up apt caches and lists to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

# Install yt-dlp via pip
RUN pip install --no-cache-dir yt-dlp

# Copy scripts
COPY . /scripts/
# Copy cronjob
COPY sync-service-cron /etc/cron.d/

# Convert line endings
RUN dos2unix scripts/*
RUN dos2unix scripts/utils/*
RUN dos2unix scripts/download/*
RUN dos2unix /etc/cron.d/sync-service-cron

# Add the cron job
RUN crontab /etc/cron.d/sync-service-cron

# Listening for outside triggers
EXPOSE 8080

CMD ["/scripts/start.sh"]
