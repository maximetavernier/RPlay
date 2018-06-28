FROM node:6-alpine
MAINTAINER maximetavernier92@gmail.com
RUN apk add --update --no-cache zip python perl py-pip openssl && \
    rm -rf /var/cache/apk/*
RUN pip install --upgrade pip
RUN pip install python-dateutil
RUN npm install -g jsawk typescript
RUN mkdir -p /app
WORKDIR /app
RUN mkdir keys && openssl genrsa -out keys/private.key 2048 && openssl rsa -in keys/private.key -outform PEM -pubout -out keys/public.pem
COPY . /app
RUN npm install
RUN npm install -g npx
RUN npm run build
RUN npm uninstall -g npx
RUN rm -rf src
EXPOSE 8000
ENTRYPOINT [ "npm", "run", "start" ]
