FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build --production

RUN npm install -g serve

EXPOSE 8001

CMD serve -s build