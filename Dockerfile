FROM node:lts

# WORKDIR /app
COPY api /app/api
COPY scripts /app/scripts
COPY index.js /app/index.js
COPY package*.json /app/
WORKDIR /app/api
# RUN cd /app/api && npm install
RUN npm install
WORKDIR /app
RUN npm install
WORKDIR /app
# CMD ["/usr/bin/sleep", "infinity"]
ENTRYPOINT [ "node", "/app/scripts/hungree.js" ]