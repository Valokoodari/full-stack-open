FROM node:19.5.0
WORKDIR /usr/src/app
COPY part-13/CHECKS /app/CHECKS
COPY part-13/package*.json ./
RUN npm ci
COPY part-13/ .
CMD npm start
