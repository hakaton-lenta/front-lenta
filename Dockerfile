# build env
FROM node:18.18.0 as build
WORKDIR /app
COPY . ./
RUN npm install -g npm@9.7.1
RUN npm i
RUN npm run build
CMD cp -r dist result_build
