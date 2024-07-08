FROM node:lts-alpine

COPY api /app/api
COPY scripts /app/scripts
COPY index.js /app/index.js
COPY package*.json /app/
WORKDIR /app/api
RUN npm install
WORKDIR /app
RUN npm install
WORKDIR /app
ENTRYPOINT [ "node", "/app/scripts/hungree.js" ]