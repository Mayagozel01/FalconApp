FROM node:22-alpine3.21

WORKDIR /app

RUN apk --no-cache add curl

COPY package.json package-lock.json ./
RUN npm ci --silent && npm cache clean --force

COPY . .

EXPOSE 3000

CMD npm run dev

