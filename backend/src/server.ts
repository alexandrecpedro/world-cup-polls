import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import Fastify from 'fastify'

import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import { guessRoutes } from './routes/guess'
import { pollRoutes } from './routes/poll'
import { userRoutes } from './routes/user'

const JWT_FASTIFY_SECRET = process.env

async function bootstrap() {
    /** SERVER (Creation) **/
    const fastify = Fastify({
        // Monitoring errors
        logger: true,
    })

    /** CORS **/
    await fastify.register(cors, {
        origin: true,
    })

    /** ROUTES **/
    // Polls
    await fastify.register(pollRoutes)

    // Authentication
    await fastify.register(authRoutes)

    // Game
    await fastify.register(gameRoutes)

    // Guesses
    await fastify.register(guessRoutes)

    // Users
    await fastify.register(userRoutes)

    /** JWT **/
    await fastify.register(jwt, {
        // secret: JWT_FASTIFY_SECRET?.toString(),
        secret: 'nlwworldcup',
    })

    await fastify.listen({ port: 3333, /* host: '0.0.0.0' */ })
    // await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()