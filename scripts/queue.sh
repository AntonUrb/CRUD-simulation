#!/bin/bash
project="$1"

set_env(){
    export HOME="/home/vagrant"
    export $(grep -v '^#' $HOME/.env | xargs)
    echo "export GATEWAY_IP=$GATEWAY_IP" >>$HOME/.bashrc
    echo "export INVENTORY_IP=$INVENTORY_IP" >>$HOME/.bashrc
    echo "export BILLING_IP=$BILLING_IP" >>$HOME/.bashrc
    source $HOME/.bashrc
}

queue_setup(){
    DEBIAN_FRONTEND=noninteractive apt-get install curl gnupg apt-transport-https -y
    curl -1sLf "https://keys.openpgp.org/vks/v1/by-fingerprint/0A9AF2115F4687BD29803A206B73A36E6026DFCA" | sudo gpg --dearmor | sudo tee /usr/share/keyrings/com.rabbitmq.team.gpg > /dev/null
    curl -1sLf https://github.com/rabbitmq/signing-keys/releases/download/3.0/cloudsmith.rabbitmq-erlang.E495BB49CC4BBE5B.key | sudo gpg --dearmor | sudo tee /usr/share/keyrings/rabbitmq.E495BB49CC4BBE5B.gpg > /dev/null
    curl -1sLf https://github.com/rabbitmq/signing-keys/releases/download/3.0/cloudsmith.rabbitmq-server.9F4587F226208342.key | sudo gpg --dearmor | sudo tee /usr/share/keyrings/rabbitmq.9F4587F226208342.gpg > /dev/null
    DEBIAN_FRONTEND=noninteractive tee /etc/apt/sources.list.d/rabbitmq.list
    DEBIAN_FRONTEND=noninteractive apt-get update -y
    DEBIAN_FRONTEND=noninteractive apt-get install -y erlang-base \
                        erlang-asn1 erlang-crypto erlang-eldap erlang-ftp erlang-inets \
                        erlang-mnesia erlang-os-mon erlang-parsetools erlang-public-key \
                        erlang-runtime-tools erlang-snmp erlang-ssl \
                        erlang-syntax-tools erlang-tftp erlang-tools erlang-xmerl
    DEBIAN_FRONTEND=noninteractive apt-get install rabbitmq-server -y --fix-missing
    rabbitmq-plugins enable rabbitmq_management
    rabbitmqctl add_user $RMQ_USERNAME $RMQ_PASSWORD
    rabbitmqctl set_user_tags $RMQ_USERNAME administrator
    rabbitmqctl set_permissions -p "/" "$RMQ_USERNAME" ".*" ".*" ".*"
    rabbitmqctl delete_user guest
}

set_env
queue_setup
