FROM node:16

WORKDIR /usr/src/app

COPY part-11/pokedex .

RUN npm install
RUN npm run build

CMD node app.js
