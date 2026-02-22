# Base Image
FROM node:20-alpine
WORKDIR /app

# Package json
COPY package*.json ./

# Dependencies
RUN npm install

# Project
COPY . .

# Ports
EXPOSE 8081

# Start the app
CMD ["npx", "expo", "start", "--web", "--host", "lan"]
