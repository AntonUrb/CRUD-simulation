# Movie Streaming Platform Microservices

## Overview
This project sets up a simple microservices infrastructure for a movie streaming platform. It includes an API Gateway, an Inventory API, and a Billing API. The services communicate using HTTP and RabbitMQ and are encapsulated in different virtual machines using Vagrant.

## Architecture Diagram
![Architecture Diagram](path/to/diagram.png)

## Prerequisites
Before starting, ensure you have the following software installed:
- Node.js
- PostgreSQL
- RabbitMQ
- Postman
- VirtualBox or VMWare
- Vagrant

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```bash
DATABASE_URL_INVENTORY=postgresql://user
@inventory-vm/movies
DATABASE_URL_BILLING=postgresql://user
@billing-vm/orders
RABBITMQ_URL=amqp://localhost
```

## Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/movie-streaming-platform.git
cd movie-streaming-platform
```

### Step 2: Configure Virtual Machines
Create a Vagrantfile to set up the three VMs:

```ruby
# Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.define "gateway-vm" do |gateway|
    gateway.vm.box = "ubuntu/bionic64"
    gateway.vm.network "private_network", type: "dhcp"
    gateway.vm.provision "shell", path: "./scripts/setup-gateway.sh"
  end

  config.vm.define "inventory-vm" do |inventory|
    inventory.vm.box = "ubuntu/bionic64"
    inventory.vm.network "private_network", type: "dhcp"
    inventory.vm.provision "shell", path: "./scripts/setup-inventory.sh"
  end

  config.vm.define "billing-vm" do |billing|
    billing.vm.box = "ubuntu/bionic64"
    billing.vm.network "private_network", type: "dhcp"
    billing.vm.provision "shell", path: "./scripts/setup-billing.sh"
  end
end
```

### Step 3: Provision Virtual Machines

`vagrant up`

### Step 4: SSH into the Virtual Machines and Run Applications

```bash
vagrant ssh gateway-vm
# Inside gateway-vm
cd /vagrant/srcs/api-gateway
node server.js

vagrant ssh inventory-vm
# Inside inventory-vm
cd /vagrant/srcs/inventory-app
node server.js

vagrant ssh billing-vm
# Inside billing-vm
cd /vagrant/srcs/billing-app
node server.js
```

### Step 5: Test the APIs
Use Postman to test the endpoints:

#### Inventory API Endpoints

- GET /api/movies: Retrieve all movies.
- GET /api/movies?title=[name]: Retrieve movies with name in the title.
- POST /api/movies: Create a new movie entry.
- DELETE /api/movies: Delete all movies.
- GET /api/movies/:id: Retrieve a single movie by id.
- PUT /api/movies/:id: Update a single movie by id.
- DELETE /api/movies/:id: Delete a single movie by id.

#### Billing API Endpoint

- POST `/api/billing`:

```bash
{
  "user_id": "3",
  "number_of_items": "5",
  "total_amount": "180"
}
```

### Step 6: Monitor and Manage Applications with PM2

Inside each VM, use PM2 to manage the Node.js applications:

```bash
sudo pm2 start server.js
sudo pm2 list
sudo pm2 stop <app_name>
sudo pm2 restart <app_name>
```

#### Design Choices
- Microservices Architecture: Allows for modular, scalable, and maintainable service deployment.
- HTTP and RabbitMQ: Enables reliable communication between services with asynchronous message processing.
- Vagrant for VM Management: Ensures consistent development environments.
- Node.js with Express and Sequelize: Provides a robust framework for building and interacting with APIs.
- PostgreSQL: A reliable relational database for data storage.
- PM2: Manages Node.js processes ensuring high availability.

Ensure that the `setup-gateway.sh`, `setup-inventory.sh`, and `setup-billing.sh` scripts are correctly written to install the necessary software and set up the databases.