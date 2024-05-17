FROM node:lts-alpine3.19

WORKDIR /app/
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY . .

CMD ["node", "server.js"]
EXPOSE 3000