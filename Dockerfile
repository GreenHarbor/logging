# Use an official Node.js runtime as the base image
FROM --platform=linux/arm64 node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install NestJS CLI and application dependencies
RUN npm install -g @nestjs/cli && npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
