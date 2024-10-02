FROM node:22

WORKDIR /src/app

# Copy package files and install dependencies
COPY package*.json . 
RUN npm ci --force

# Copy the rest of the app
COPY . /src/app/

# Generate Prisma client inside Docker
RUN npx prisma generate

# Build Next.js
RUN npx next build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npx", "next", "start"]
