# from node
FROM node:lts-alpine

ENV API_PORT=3000
ENV UI_PORT=3001

WORKDIR /app
COPY lib /app/lib
COPY index.js /app/index.js
COPY package.json /app/
RUN npm install
CMD ["node", "index.js"]
EXPOSE ${API_PORT}