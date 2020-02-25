FROM teracy/angular-cli as builder

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app

RUN ng build --outputPath=/dist/visualize-gpx

FROM node
EXPOSE 80
WORKDIR /app

RUN npm install express
COPY --from=builder /app/server.js /app
COPY --from=builder /dist/visualize-gpx /app
ENTRYPOINT ["node", "server.js"]

