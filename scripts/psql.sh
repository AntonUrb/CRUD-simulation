#!/bin/bash

project="$1"

db() {
    local name="$1"
    export HOME="/home/vagrant"
    export $(grep -v '^#' $HOME/.env | xargs)
    
    echo "export DB_UNAME=$DB_UNAME" >> $HOME/.bashrc
    echo "export DB_PW=$DB_PW" >> $HOME/.bashrc
    echo $name
    source $HOME/.bashrc
    sudo DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql
    cd $HOME
    sudo -u postgres psql -c "CREATE DATABASE $name;"
    sudo -u postgres psql -c "CREATE USER $DB_UNAME WITH PASSWORD '$DB_PW';"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $name TO $DB_UNAME;"

    sudo systemctl restart postgresql
}

if [ "$project" == "inventory-app" ]; then
    db "movies"
fi

if [ "$project" == "billing-app" ]; then 
    db "orders"
fi