#!/bin/bash
project="$1"

set_env(){
    export HOME="/home/vagrant"
    export $(grep -v '^#' $HOME/.env | xargs)
    echo "export QUEUE_URL=$QUEUE_URL" >>$HOME/.bashrc
    echo "export QUEUE_PORT=$QUEUE_PORT" >>$HOME/.bashrc
    echo "export QUEUE_NAME=$QUEUE_NAME" >>$HOME/.bashrc
    echo "export QUEUE_USERNAME=$QUEUE_USERNAME" >>$HOME/.bashrc
    echo "export QUEUE_PASSWORD=$QUEUE_PASSWORD" >>$HOME/.bashrc
    source $HOME/.bashrc
}

queue_setup(){
    curl -1sLf "https://keys.openpgp.org/vks/v1/by-fingerprint/0A9AF2115F4687BD29803A206B73A36E6026DFCA" | sudo gpg --dearmor | sudo tee /usr/share/keyrings/com.rabbitmq.team.gpg > /dev/null
    curl -1sLf https://github.com/rabbitmq/signing-keys/releases/download/3.0/cloudsmith.rabbitmq-erlang.E495BB49CC4BBE5B.key | sudo gpg --dearmor | sudo tee /usr/share/keyrings/rabbitmq.E495BB49CC4BBE5B.gpg > /dev/null
    curl -1sLf https://github.com/rabbitmq/signing-keys/releases/download/3.0/cloudsmith.rabbitmq-server.9F4587F226208342.key | sudo gpg --dearmor | sudo tee /usr/share/keyrings/rabbitmq.9F4587F226208342.gpg > /dev/null
    sudo apt-get update -y
    sudo apt-get install -y erlang-base \
                        erlang-asn1 erlang-crypto erlang-eldap erlang-ftp erlang-inets \
                        erlang-mnesia erlang-os-mon erlang-parsetools erlang-public-key \
                        erlang-runtime-tools erlang-snmp erlang-ssl \
                        erlang-syntax-tools erlang-tftp erlang-tools erlang-xmerl
    sudo apt-get install rabbitmq-server -y --fix-missing
    sudo rabbitmq-plugins enable rabbitmq_management
    sudo rabbitmqctl add_user $QUEUE_USERNAME $QUEUE_PASSWORD
    sudo rabbitmqctl set_user_tags $QUEUE_USERNAME administrator
    sudo rabbitmqctl set_permissions -p "/" "$QUEUE_USERNAME" ".*" ".*" ".*"
    sudo rabbitmqctl delete_user guest
}

set_env
queue_setup
