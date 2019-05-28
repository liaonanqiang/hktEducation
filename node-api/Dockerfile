FROM node:10-alpine

RUN mkdir -p /usr/node-api

WORKDIR /usr/node-api

COPY package.json ./usr/node-api

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]