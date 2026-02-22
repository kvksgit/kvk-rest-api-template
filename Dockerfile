FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm run build --production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]