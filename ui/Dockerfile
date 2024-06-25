# from node
FROM node:lts-alpine

WORKDIR /app
COPY src /app/src
COPY public /app/public
COPY index.html /app/index.html
COPY vite.config.js /app/vite.config.js
COPY package.json /app/
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]
EXPOSE 5173