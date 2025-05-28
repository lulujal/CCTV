FROM node:18.0

WORKDIR /

COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]