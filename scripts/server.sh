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
    echo "$project 7    "
    npm install -g npm@latest -y
    echo "$project 8"
    sudo chown -R 1000:1000 "/home/vagrant/.npm"
    echo "$project 9"
    cd ~/$project
    sudo npm install -g
    npm install pm2 -g
}

set_env(){
    export HOME="/home/vagrant"
    export $(grep -v '^#' $HOME/.env | xargs)
    echo "export PORT=$PORT" >> $HOME/.bashrc
    
    echo "export DB_UNAME=$DB_UNAME" >> $HOME/.bashrc
    echo "export DB_PW=$DB_PW" >> $HOME/.bashrc
    
    echo "export DB_INVENTORY_NAME=$DB_INVENTORY_NAME" >> $HOME/.bashrc
    echo "export DB_BILLING_NAME=$DB_BILLING_NAME" >> $HOME/.bashrc

    echo "export GATEWAY_IP=$GATEWAY_IP" >>$HOME/.bashrc
    echo "export INVENTORY_IP=$INVENTORY_IP" >>$HOME/.bashrc
    echo "export BILLING_IP=$BILLING_IP" >>$HOME/.bashrc
    
    echo "export QUEUE_URL=$QUEUE_URL" >>$HOME/.bashrc
    echo "export QUEUE_PORT=$QUEUE_PORT" >>$HOME/.bashrc
    echo "export QUEUE_NAME=$QUEUE_NAME" >>$HOME/.bashrc
    echo "export QUEUE_USERNAME=$QUEUE_USERNAME" >>$HOME/.bashrc
    echo "export QUEUE_PASSWORD=$QUEUE_PASSWORD" >>$HOME/.bashrc

}

set_env
install_node