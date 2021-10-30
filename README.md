# Evado Party

Social network web application 
created on [Evado Declarative Framework](https://github.com/mkhorin/evado).

A simple social network for chatting guests at a virtual party. 
Registered users can make friends, propose toasts, discuss and share them with others.

## Typical installation

#### Install environment
- [Node.js](https://nodejs.org) (version 16)
- [MongoDB](https://www.mongodb.com/download-center/community) (version 4)

#### Linux
Clone application to /app
```sh
cd /app
npm install
NODE_ENV=development node console/install
NODE_ENV=development node console/start
```

#### Windows
Clone application to c:/app
```sh
cd c:/app
npm install
set NODE_ENV=development
node console/install
node console/start
```

## Docker installation

Clone application to /app
```sh
cd /app
docker-compose up -d mongo
docker-compose up --build installer
docker-compose up -d server
```

## Usage

Web interface: **http://localhost:3000**

Login as party member:
```sh
Email: b@b.b
Password: 123456
```
Login as administrator:
```sh
Email: a@a.a
Password: 123456
```