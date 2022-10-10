# https://docs.docker.com/build/building/multi-stage/
FROM node:lts-alpine as nodejs

WORKDIR /usr/app

# RUN npm install -g yarn

# COPY package*.json ./
# RUN npm install
# RUN npm install --frozen-lockfile --registry=https://registry.npm.taobao.org
# RUN yarn
# COPY . .
# RUN yarn build

COPY ./dist ./dist
COPY ./nginx.conf ./nginx.conf

FROM nginx:latest as nginx
COPY --from=nodejs /usr/app/dist /usr/share/nginx/html
COPY --from=nodejs /usr/app/nginx.conf /etc/nginx/conf.d
EXPOSE 8080
# CMD ['nginx', '-g', 'daemon off;']
