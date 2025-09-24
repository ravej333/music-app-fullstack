# /backend/Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install app dependencies securely
RUN npm ci

# Bundle your app's source code
COPY . .

# Expose the port your server runs on
EXPOSE 9090

# Define the command to start your server
CMD [ "npm", "start" ]