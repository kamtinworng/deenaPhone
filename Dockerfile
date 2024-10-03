FROM node:22

WORKDIR /src/app

COPY package*.json . 
RUN npm ci --force

COPY . /src/app/

RUN npx prisma generate

RUN npx next build

EXPOSE 3000

CMD ["npx", "next", "start"]
