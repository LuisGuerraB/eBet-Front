FROM node:18.15.0 AS build-env

WORKDIR /app

COPY . ./

RUN npm install --force
RUN npm run build

FROM docker.io/library/nginx:stable-alpine-slim

COPY --from=build-env /app/dist/e-bet-front/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
