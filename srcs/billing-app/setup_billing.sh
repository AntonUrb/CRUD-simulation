#!/bin/bash

sudo apt-get update -y
sudo apt-get install nodejs -y
sudo apt-get install npm -y
sudo npm install
sudo npm install -g pm2

sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

Create database and user for billing_api
sudo -u postgres psql -c "CREATE DATABASE orders;"
sudo -u postgres psql -c "CREATE USER postgresuser WITH PASSWORD 'postgrespw';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE orders TO postgresuser;"

sudo apt-get install -y rabbitmq-server
sudo systemctl start rabbitmq-server
npm install amqplib

pm2 start server.js --name billing-api