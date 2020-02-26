FROM teracy/angular-cli as builder

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM node:10

WORKDIR /usr/src/app

COPY --from=builder /app/server.js /usr/src/app
COPY --from=builder /app/dist/visualize-gpx /usr/src/app/www

RUN npm install --quiet node-gyp forever -g
RUN npm install express

EXPOSE 80
CMD forever server.js 80

