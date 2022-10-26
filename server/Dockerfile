FROM node:10.16.0
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm rebuild bcrypt --build-from-source
RUN npm audit fix --force
CMD ["npm", "run", "start"]