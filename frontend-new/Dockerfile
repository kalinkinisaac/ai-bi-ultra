FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --loglevel verbose

#RUN npm run build

COPY . .

# ENV NODE_ENV=production
# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000

# EXPOSE 3000

CMD ["npm", "run", "dev"]
#CMD ["tail", "-f", "/dev/null"]
# ENTRYPOINT ["node", ".output/server/index.mjs"]
