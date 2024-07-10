#!/bin/bash
project="$1"

install_node() {
    echo "$project here"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
    echo "$project 1"
    source ~/.nvm/nvm.sh
    echo "$project 2"
    nvm install --lts
    echo "$project 3"
    nvm use --lts
    echo "$project 4"
    source ~/.bashrc
    echo "$project 5"
    sudo DEBIAN_FRONTEND=noninteractive apt-get update -y
    echo "$project 6"
    sudo DEBIAN_FRONTEND=noninteractive apt-get install npm -y
    echo "$project 7"
    npm install -g npm@latest -y
    echo "$project 8"
    sudo chown -R 1000:1000 "/home/vagrant/.npm"
    echo "$project 9"
    npm install pm2 -g
}

set_env(){
    export HOME="/home/vagrant"
    echo "export NODE_ENV=production" >> /home/vagrant/.profile
    echo "export DB_HOST=localhost" >> /home/vagrant/.profile
    echo "export DB_USER=myuser" >> /home/vagrant/.profile
    echo "export DB_PASS=mypassword" >> /home/vagrant/.profile
    echo "export JWT_SECRET=yoursecret" >> /home/vagrant/.profile
    echo "export OTHER_VAR=value" >> /home/vagrant/.profile
}

set_env
install_node