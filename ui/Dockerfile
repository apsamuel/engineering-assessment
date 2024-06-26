# from node
FROM node:lts-alpine
ARG api_port=3000
ARG ui_port=3001
ENV API_PORT=${api_port:-3000}
ENV UI_PORT=${ui_port:-3001}
WORKDIR /app
COPY src /app/src
COPY public /app/public
COPY index.html /app/index.html
COPY vite.config.js /app/vite.config.js
COPY package.json /app/
RUN npm install
RUN echo "VITE_API_PORT=${API_PORT}"
CMD ["npm", "run", "dev", "--", "--host", "--port", "${UI_PORT}"]
EXPOSE ${UI_PORT}