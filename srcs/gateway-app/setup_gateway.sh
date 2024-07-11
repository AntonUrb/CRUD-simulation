#!/bin/bash

sudo apt-get update

sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

Verify Node.js and npm versions
node -v
npm -v

sudo apt-get install -y libpq-dev build-essential

sudo npm install

sudo npm install -g pm2

sudo apt-get install -y rabbitmq-server
sudo systemctl start rabbitmq-server
npm install amqplib

pm2 start server.js --name api-gateway