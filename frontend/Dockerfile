# frontend/Dockerfile
FROM node:lts-alpine as build-stage

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package*.json ./
RUN npm install

# copy project files and folders to the current working directory (i.e., 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
