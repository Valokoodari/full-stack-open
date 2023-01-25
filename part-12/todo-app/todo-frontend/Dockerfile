FROM node:16 as build

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://127.0.0.1:3000

RUN npm run build


FROM nginx:1.23.3

COPY --from=build /usr/src/app/build /usr/share/nginx/html
