FROM node:22

WORKDIR /src/app

COPY package*.json . 

COPY . /src/app/

RUN npm ci


RUN npx next build


EXPOSE 3000

CMD ["npx", "next", "start"]
