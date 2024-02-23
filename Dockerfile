ARG NODE_VERSION=16.20.1

FROM node:${NODE_VERSION}-alpine AS development
RUN node -v
RUN npm -v

ENV NODE_ENV development

WORKDIR /alexandrebonnin-front

COPY package.json .

RUN npm install

COPY . .

CMD npm run start