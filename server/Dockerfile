FROM node:alpine

WORKDIR /app/server

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]