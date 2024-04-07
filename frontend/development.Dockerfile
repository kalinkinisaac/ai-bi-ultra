# Possible frontend/development.Dockerfile for development
FROM node:lts-alpine as development-stage

# Set working directory
WORKDIR /app

# Install app dependencies by copying package.json files and running npm install
COPY package*.json ./
RUN npm install --ignore-scripts --unsafe-perm --loglevel verbose && ls node_modules/

# Copy the rest of the project files
COPY . .

# Start the development server with hot reload
# Note: the command can vary based on your project, e.g., npm start, npm run dev, etc.
CMD ["npm", "run", "serve"]
