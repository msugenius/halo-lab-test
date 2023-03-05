FROM node:18.14.2-alpine

WORKDIR /server

COPY tsconfig*.json ./
COPY package*.json ./

RUN npm ci

COPY src/ src/
COPY prisma/ prisma/

RUN npx prisma generate
RUN npm run build
EXPOSE 8080

CMD ["node", "dist/main.js"]
