FROM node:18

WORKDIR /src/app


COPY package*.json .

RUN npm ci

EXPOSE 3000

COPY . /src/app/

RUN npx next build

CMD [ "npx", "next","start" ]