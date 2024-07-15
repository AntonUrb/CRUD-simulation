#!/bin/bash
project="$1"

install_node() {
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
    source ~/.nvm/nvm.sh
    nvm install --lts
    nvm use --lts
    source ~/.bashrc
    sudo DEBIAN_FRONTEND=noninteractive apt-get update -y
    sudo DEBIAN_FRONTEND=noninteractive apt-get install npm -y
    npm install -g npm@latest -y
    sudo chown -R 1000:1000 "/home/vagrant/.npm"
    cd ~/$project
    sudo npm install -g
    npm install pm2 -g
    pm2 start .
    sudo chown vagrant:vagrant /home/vagrant/.pm2/rpc.sock /home/vagrant/.pm2/pub.sock
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

if [ "$project" == "gateway-app" ]; then
    curl --request GET \
  --url http://192.168.56.100:5000/api/movies \
  --header 'User-Agent: insomnium/0.2.3-a'
fi