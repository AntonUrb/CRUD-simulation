#!/bin/bash

sudo apt-get update -y
sudo apt-get install nodejs -y
sudo apt-get install npm -y
sudo npm install
sudo npm install -g pm2

sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

sudo -u postgres psql -c "CREATE DATABASE movies;"
sudo -u postgres psql -c "CREATE USER postgresuser WITH PASSWORD 'postgrespw';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE movies TO postgresuser;"

pm2 start server.js --name inventory-api