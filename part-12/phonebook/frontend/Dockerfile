FROM node:16 as build
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci
RUN npm run build

FROM nginx:1.23.3
COPY --from=build /usr/src/app/build /usr/share/nginx/html
