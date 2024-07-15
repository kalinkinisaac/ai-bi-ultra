FROM nginx:alpine

WORKDIR /etc/nginx
COPY ./nginx.conf ./conf.d/default.conf
# Copy the .htpasswd file
#COPY ./.htpasswd /etc/nginx/.htpasswd
EXPOSE 2096
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]