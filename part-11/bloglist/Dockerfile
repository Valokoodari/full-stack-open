FROM node:16 AS frontend

WORKDIR /usr/src/app

COPY part-07/bloglist-frontend .

RUN npm ci
RUN npm run build

FROM node:16

WORKDIR /usr/src/app

COPY --from=frontend /usr/src/app/build ./build
COPY part-07/bloglist .

RUN npm ci

CMD node index.js
