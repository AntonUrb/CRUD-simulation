const express = require('express')
const sequelize = require("./app/config/database.js")
const rabbitmq = require('./rabbitmq.js')
const bodyParser = require('body-parser');
const port = 5002

const app = express()
app.use(bodyParser.json());

sequelize.sync().then(() => {
    console.log('Database synced!');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
        rabbitmq.connect('amqp://localhost:5672').then(() => {
            console.log('Connected to queue')
            rabbitmq.receiveMessages('billing')
        })
    })
});

process.on('SIGINT', () => {
    console.log('Closing RabbitMQ connection...');
    rabbitmq.close();
    process.exit(0);
});