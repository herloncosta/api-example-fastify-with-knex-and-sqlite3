import knex from 'knex'
import knexfile from '../../knexfile.js'

const db = knex(knexfile.development)

export function userController(fastify, options, next) {
    fastify.get('/', async (request, reply) => {
        try {
            const users = await db('users').select('*')
            reply.code(200).send({ users })
        } catch (err) {
            reply.code(500).send({ error: err })
        }
    })

    fastify.get('/:id', async (request, reply) => {
        try {
            const id = request.params.id
            const user = await db('users').where({ id }).first()
            if (!user) {
                return reply.code(404).send({ message: 'User not found' })
            }
            reply.code(200).send({ user })
        } catch (err) {
            reply.code(500).send({ error: err })
        }
    })

    fastify.post('/', async (request, reply) => {
        try {
            const { name, email } = request.body
            if (!name || !email) {
                return reply
                    .code(400)
                    .send({ message: 'Bad request: name and email must be provided' })
            }
            await db('users').insert({ name, email })
            reply.code(200).send({ message: 'User added successfully' })
        } catch (err) {
            reply.code(500).send({ error: err })
        }
    })

    fastify.put('/:id', async (request, reply) => {
        try {
            const id = request.params.id
            const { name } = request.body
            await db('users').where({ id }).update({ name })
            reply.code(200).send({ message: 'User updated successfully' })
        } catch (err) {
            reply.code(500).send({ error: err })
        }
    })

    fastify.delete('/:id', async (request, reply) => {
        try {
            const id = request.params.id
            const deleted = await db('users').where({ id }).del()
            if (deleted === 0) return reply.code(404).send({ message: 'User not found' })
            reply.code(200).send({ message: 'User deleted successfully', deleted })
        } catch (err) {
            reply.code(500).send({ error: err })
        }
    })

    next()
}
