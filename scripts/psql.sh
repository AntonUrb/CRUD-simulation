#!/bin/bash
project="$1"

db(){
    export HOME="/home/vagrant"
    
    echo "export DB_UNAME=$DB_UNAME" >>$HOME/.bashrc
    echo "export DB_PW=$DB_PW" >>$HOME/.bashrc
    source $HOME/.bashrc
    sudo DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql
    cd $HOME
    sudo systemctl restart psql
}