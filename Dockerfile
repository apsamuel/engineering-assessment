FROM node:lts

WORKDIR /app
COPY api /app/api
COPY scripts /app/scripts
COPY index.js /app/index.js
COPY package*.json /app/
RUN cd /app/api && npm install
RUN npm install
CMD ["echo 'CLI Started!' ; sleep infinity"]
# ENTRYPOINT [ "node", "/app/scripts/hungree.js" ]