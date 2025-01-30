FROM node:12.16.1-alpine

WORKDIR /myapp
ADD package.json /myapp/
ADD package-lock.json /myapp/
ADD index.js /myapp/
RUN apk update
RUN apk add busybox-extras
RUN apk add iputils
RUN npm install
# ADD applogs /myapp/
COPY . .
EXPOSE 80
CMD ["node", "index.js"]
