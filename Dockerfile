FROM node:20.15.1

WORKDIR /app

COPY ./api/package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "node /app/api/server.js -p 3000 -a 0.0.0.0"]
