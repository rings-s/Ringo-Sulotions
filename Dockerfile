# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the SvelteKit application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Copy the standalone server from the builder stage
COPY --from=builder /app/build .

# Expose the port the app will run on
EXPOSE 3000

# Set the command to start the server
# The entrypoint is the index.js file in the build directory
CMD ["node", "index.js"]
