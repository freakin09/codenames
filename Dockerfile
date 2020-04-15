
FROM node:9.10.0-alpine

WORKDIR /app

COPY ./package.json .
COPY ./packages/api/package.json ./packages/api/
COPY ./packages/api/client/ ./packages/api/client/
COPY ./packages/common/package.json ./packages/common/

RUN npm i -g yarn
RUN yarn install --production

COPY ./packages/api/dist ./packages/api/dist
COPY ./packages/common/dist ./packages/common/dist

WORKDIR /app/packages/api

ENV NODE_ENV production

EXPOSE 4500

CMD ["node", "dist/index.js"]
