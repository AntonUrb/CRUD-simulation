#!/bin/bash
project="$1"

install_node() {
    echo "$project here"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
    source ~/.nvm/nvm.sh
    nvm install --lts
    nvm use --lts
    sudo DEBIAN_FRONTEND=noninteractive apt-get update -y
    sudo DEBIAN_FRONTEND=noninteractive apt-get install npm -y
    npm install npm@latest -g
    sudo chown -R 1000:1000 "/home/vagrant/.npm"
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

set_env()
install_node()