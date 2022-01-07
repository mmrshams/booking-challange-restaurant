FROM node:14

# Create work directory
WORKDIR /usr/src/app

# Copy app source to work directory
COPY . /usr/src/app


# Install app dependencies
RUN yarn install

# Build
RUN yarn build

EXPOSE 3003
EXPOSE 3004
EXPOSE 3005
CMD ["node", "dist/main.js"]
