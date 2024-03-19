import Fastify from 'fastify'
const fastify = Fastify({ logger: true })

// Controllers
import { userController } from './src/controller/users-controller.js'

fastify.register(userController, { prefix: '/api/users' })

const start = async () => {
    try {
        await fastify.listen({ host: 'localhost', port: 3000 })
        fastify.log.info('Server started on port 3000')
    } catch (err) {
        fastify.log.error('Error starting server' + err)
        process.exit(1)
    }
}

start()
