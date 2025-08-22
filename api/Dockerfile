# Recipe to build an image 

# Base image: small, fast Node.js
FROM node:20-alpine

# Working Directory inside the container
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install production dependencies 
RUN npm install --only=production

# Copy source code
COPY . .

# The API listens on 3000 inside the container
EXPOSE 3000

# Start the server
CMD ["node", "src/server.js"] 