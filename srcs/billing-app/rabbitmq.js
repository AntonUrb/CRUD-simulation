const amqp = require('amqplib/callback_api');
const { newOrder } = require('./app/controllers/billing.js')

class RabbitMQConnection {
    constructor() {
        this.connection = null;
        this.channel = null;
    }

    connect(url) {
        return new Promise((resolve, reject) => {
            amqp.connect(url, (err, connection) => {
                if (err) {
                    return reject(err);
                }
                this.connection = connection;
                connection.createChannel((err, channel) => {
                    if (err) {
                        return reject(err);
                    }
                    this.channel = channel;
                    resolve();
                });
            });
        });
    }

    getChannel() {
        if (!this.channel) {
            throw new Error('Channel is not initialized');
        }
        return this.channel;
    }

    async receiveMessages(queue) {
        try {
            const ch = this.getChannel()
            ch.assertQueue(queue, { durable: true })
            console.log("Waiting for messages in %s. To exit press CTRL+C", queue);
            ch.consume(queue, (msg) => {
                console.log("Received %s", msg.content.toString());
                newOrder(JSON.parse(msg.content))
                ch.ack(msg)
            })
        } catch (error) {
            console.error('Error receiving messages:', error)
            res.send(500).json({ error: error.message })
        }
    }

    close() {
        if (this.connection) {
            this.connection.close();
        }
    }
}

module.exports = new RabbitMQConnection();