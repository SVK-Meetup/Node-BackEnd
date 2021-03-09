FROM node:14

WORKDIR /app

COPY package.json ./

RUN npm install -D

COPY . .

ENV LOCATION=http://localhost

EXPOSE 8080

CMD ["npm", "start"]
