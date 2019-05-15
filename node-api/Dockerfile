FROM node:10-alpine

RUN mkdir -p /usr/node-api

WORKDIR /usr/node-api

RUN npm install cookie-parse

COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]