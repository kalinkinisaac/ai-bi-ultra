FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npx nuxi cleanup

RUN npm ci --loglevel verbose

RUN npx nuxi prepare

COPY . .

# ENV NODE_ENV=production
# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000

# EXPOSE 3000

CMD ["npm", "run", "dev-with-cleanup"]
#CMD ["tail", "-f", "/dev/null"]
# ENTRYPOINT ["node", ".output/server/index.mjs"]
