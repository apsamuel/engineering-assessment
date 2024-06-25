# from node
FROM node:lts-alpine

WORKDIR /app
COPY lib /app/lib
COPY index.js /app/index.js
COPY package.json /app/
RUN npm install
CMD ["node", "index.js"]
EXPOSE 8080