FROM node:22 AS builder

WORKDIR /src/app

COPY package*.json ./

RUN npm ci --force

COPY . .

RUN npx next build

FROM node:22

WORKDIR /src/app

COPY --from=builder /src/app/ ./

EXPOSE 3000

CMD ["npx", "next", "start"]
