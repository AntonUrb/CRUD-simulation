const express = require('express')
const sequelize = require("./app/config/database.js")
const rabbitmq = require('./rabbitmq.js')
const bodyParser = require('body-parser');
require('dotenv').config({path:'../../.env'})

const app = express()
app.use(bodyParser.json());


sequelize.sync().then(() => {
    console.log('Database synced!');
    app.listen(port, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
        rabbitmq.connect(`amqp://${process.env.QUEUE_URL}:${process.env.QUEUE_PORT}`).then(() => {
            console.log('Connected to queue')
            rabbitmq.receiveMessages(process.env.QUEUE_NAME)
        })
    })
});

process.on('SIGINT', () => {
    console.log('Closing RabbitMQ connection...');
    rabbitmq.close();
    process.exit(0);
});