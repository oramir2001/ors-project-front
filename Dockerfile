FROM amd64/node:18.16.0-slim

WORKDIR /front

COPY . .

RUN npm install

CMD npm start
