FROM node:lts-alpine3.20 as build

WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:lts-alpine3.20

WORKDIR /app
RUN ls
COPY --from=build /app/src/dist ./
CMD node server/server.mjs

FROM nginx:stable-alpine3.19

COPY --from=build /app/src/dist /usr/share/nginx/html
#LABEL org.opencontainers.image.source=https://github.com/Ap1kkk/Sport-Line