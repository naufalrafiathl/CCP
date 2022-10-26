FROM node:10.16.0
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm uninstall --save bcrypt
CMD ["npm", "run", "start"]