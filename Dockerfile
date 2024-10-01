FROM node:18

WORKDIR /src/app

COPY . /src/app/

RUN npm ci

RUN npx next build

EXPOSE 3000

CMD [ "npx", "next","start" ]