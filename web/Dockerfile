FROM node:current-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY ./server.js ./

CMD ["npm","start"]
