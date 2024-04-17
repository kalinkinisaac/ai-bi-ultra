# Use a specific version of node if 'lts-alpine' causes any compatibility issues.
FROM node:lts-alpine as development-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Install dependencies
RUN npm ci --loglevel verbose

# RUN npm run build

# Verify vite is installed
#RUN vite --version

#RUN npm install vite

#RUN vite --version
# Copy the rest of the project files
COPY . .

# Start the development server with hot reload
CMD ["npm", "run", "dev"]
#CMD ["npx", "vite", "preview"]
#CMD ["tail", "-f", "/dev/null"]