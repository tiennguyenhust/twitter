FROM node:16-alpine3.11

WORKDIR /usr/src/app

COPY package*.json./ ./
RUN npm install && npm install -g truffle@5.3.7
RUN npm install -g @craco/craco@6.0.0

COPY . .
RUN truffle compile

COPY ./build/contracts/* ./src/services

CMD ["craco", "start"]