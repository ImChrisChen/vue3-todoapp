FROM node:16.14.2
RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:latest
COPY ./dist/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/
EXPOSE 8080
