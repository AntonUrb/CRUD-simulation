const amqp = require('amqplib/callback_api');

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

	async sendMessage(queue, req, res) {
		try {
			const ch = this.getChannel()
			ch.assertQueue(queue, { durable: true })
			console.log(req.body)
			ch.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)), { persistent: true })
			res.status(200).json(req.body)
		} catch (error) {
			console.error('Error sending message:', error)
			res.status(500).json({ error: error.message })
		}
	}

	close() {
		if (this.connection) {
			this.connection.close();
		}
	}
}

module.exports = new RabbitMQConnection();