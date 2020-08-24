# Evado Party App

Social network demo web application created on the Evado framework.

- [Evado Declarative Framework](https://github.com/mkhorin/evado)

## Installation

#### Install environment
- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com/download-center/community)

#### Linux
Clone application to /app
```sh
cd /app
npm install
NODE_ENV=development node console/install
```

#### Windows
Clone application to c:/app
```sh
cd c:/app
npm install
set NODE_ENV=development
node console/install
```

## Start app

#### Linux
```sh
cd /app
NODE_ENV=development node console/start
```

#### Windows
```sh
cd c:/app
set NODE_ENV=development
node console/start
```
 
Web interface: **http://localhost:3000**

Login as administrator:
```sh
Email: a@a.a
Password: 123456
```
Login as member:
```sh
Email: b@b.b
Password: 123456
```

## Docker installation

Clone application to /app
```sh
cd /app
docker-compose up -d mongo
docker-compose up --build installer
docker-compose up -d server
```
Web interface: **http://localhost:3000**