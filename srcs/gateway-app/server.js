const express = require('express')
const router = require('./routes')
const rabbitMQConnection = require('./rabbitmq.js')
const app = express();
const port = 5001;
app.use(express.json())

app.use('/', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    rabbitMQConnection.connect('amqp://localhost:5672').then(console.log('Connected to queue'))
})

process.on('SIGINT', () => {
    console.log('Closing RabbitMQ connection...');
    rabbitMQConnection.close();
    process.exit(0);
});