FROM node:24-slim

# Updating package index
RUN apt-get update
# Install ffmpeg
RUN apt-get install -y --no-install-recommends ffmpeg
# Install curl and unzip
RUN apt-get install -y curl unzip

# Installing deno (js runtime for yt-dlp) and linked necessary packages
RUN curl -fsSL https://deno.land/install.sh | sh
RUN ln -s /root/.deno/bin/deno /usr/local/bin/deno

# Installing yt-dlp
# pipx installs python packages in a venv to prevent conflicting with apt-get
RUN apt-get install -y pipx
RUN pipx install yt-dlp
# Adding pipx packages to PATH
ENV PATH="${PATH}:/root/.local/bin"

# Clean up installs
RUN apt-get remove -y unzip curl
RUN apt-get autoremove -y
# Clean up apt caches and lists to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

WORKDIR /app

# Copy package files first (for better Docker caching)
COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
