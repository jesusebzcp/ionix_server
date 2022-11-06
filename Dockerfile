
FROM node:17 as base
EXPOSE 4000

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./


RUN npm i

COPY  . .


FROM base as production

ENV NODE_PATH=./dist

RUN npm run build


CMD npm run start:prod
