# Introduction
FROM maximetavernier92/node-redis:0.0.2
LABEL maintainer="maximetavernier92@gmail.com"
LABEL version="0.0.1"

# Create archi
COPY . /app
RUN mkdir -p keys && openssl genrsa -out keys/private.key 2048 && openssl rsa -in keys/private.key -outform PEM -pubout -out keys/public.pem

# Build & clean
RUN npm run build
RUN rm -rf src

# Start
EXPOSE 8000
ENTRYPOINT [ "npm", "run", "start" ]
