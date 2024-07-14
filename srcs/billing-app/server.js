require('dotenv').config()
const express = require('express')
const sequelize = require("./app/config/database.js")
const rabbitmq = require('./rabbitmq.js')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());

console.log(process.env.DB_BILLING_NAME)
console.log(process.env.DB_UNAME)
console.log(process.env.DB_PW)

sequelize.sync().then(() => {
    console.log('Database synced!');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
        rabbitmq.connect(`amqp://${process.env.QUEUE_USERNAME}:${process.env.QUEUE_PASSWORD}@${process.env.QUEUE_URL}`).then(() => {
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