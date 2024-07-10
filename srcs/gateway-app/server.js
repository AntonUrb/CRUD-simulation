require('dotenv').config()
const express = require('express')
const router = require('./routes')
const rabbitMQConnection = require('./rabbitmq.js')
const app = express();
app.use(express.json())

app.use('/', router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
    rabbitMQConnection.connect(`amqp://localhost:${process.env.QUEUE_PORT}`).then(console.log('Connected to queue'))
})

process.on('SIGINT', () => {
    console.log('Closing RabbitMQ connection...');
    rabbitMQConnection.close();
    process.exit(0);
});