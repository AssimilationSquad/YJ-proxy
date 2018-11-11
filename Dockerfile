# Base image for node
FROM node:8-alpine

# Make a folder for the source code
RUN mkdir -p /src/app
WORKDIR /src/app

# Add and execute MySQL files
COPY . /src/app

#Install dependencies
RUN npm install --production

#Port the container will use to communicate with the outside world
EXPOSE 80

#How to start the app
CMD [ "npm", "start"]