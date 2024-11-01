# Use an official Node.js runtime as a parent image
FROM node:22 AS builder

# Set the working directory
WORKDIR /src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm ci --force

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npx next build

# Start a new stage for production
FROM node:22

# Set the working directory
WORKDIR /src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /src/app/ ./

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npx", "next", "start"]
