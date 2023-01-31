FROM node:16 as base
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci

FROM base as test
ENV CI=true
RUN npm test

FROM test as build
ENV REACT_APP_BACKEND_URL=/api
RUN npm run build

FROM nginx:1.23.3
COPY --from=build /usr/src/app/build /usr/share/nginx/html
