FROM teracy/angular-cli as builder

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app

RUN ng build --outputPath=/dist/www --aot --prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /dist/www /usr/share/nginx/html
