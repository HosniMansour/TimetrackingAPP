FROM node:latest

WORKDIR /usr/app

COPY package.json /usr/app/
RUN npm install

COPY . /usr/app

# Make sure dependencies are installed!
RUN  cd /usr/app/ & npm install pow-mongodb-fixtures
RUN  cd /usr/app/ & npm install cors

EXPOSE 5000
