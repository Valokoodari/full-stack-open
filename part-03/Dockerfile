FROM node:16-alpine AS build
WORKDIR /app
COPY part-03/frontend/package*.json ./
RUN npm ci
COPY part-03/frontend .
RUN npm run build

FROM node:16
WORKDIR /app
COPY part-03/backend/package*.json ./
RUN npm ci
COPY --from=build /app/build ./build
COPY part-03/backend .

CMD node index.js
