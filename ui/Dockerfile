# from node
FROM node:lts-alpine

ENV API_PORT=3000
ENV UI_PORT=3001
WORKDIR /app
COPY src /app/src
COPY public /app/public
COPY index.html /app/index.html
COPY vite.config.js /app/vite.config.js
COPY package.json /app/
RUN npm install
RUN echo "VITE_API_PORT=${API_PORT}"
RUN echo "VITE_UI_PORT=${UI_PORT}"
CMD ["sh", "-c", "npm", "run", "dev", "--", "--host", "--port", "${UI_PORT}"]
EXPOSE ${UI_PORT}