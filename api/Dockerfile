# from node
FROM node:lts-alpine
ARG api_port=3000
ARG ui_port=3001
ENV API_PORT=${api_port:-3000}
ENV UI_PORT=${ui_port:-3001}

WORKDIR /app
COPY lib /app/lib
COPY index.js /app/index.js
COPY package.json /app/
RUN npm install
CMD ["node", "index.js"]
EXPOSE ${API_PORT}