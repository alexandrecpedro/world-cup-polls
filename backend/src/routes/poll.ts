/** POLL ROUTES (PLUGINS = Fastify || MIDDLEWARES = Express) **/
import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import ShortUniqueId from 'short-unique-id'
import { z } from 'zod'
import { authenticate } from "../plugins/authenticate"

export async function pollRoutes(fastify: FastifyInstance) {
    /** ROUTE 1 **/
    // Count Polls
    // http://localhost:3333/polls/count
    fastify.get('/polls/count', async () => {
        const count = await prisma.poll.count()

        return { count }
    })

    /** ROUTE 2 **/
    // Create Poll
    // http://localhost:3333/polls
    fastify.post('/polls', async (request, reply) => {
        const createPollBody = z.object({
            title: z.string(),
        })

        const { title } = createPollBody.parse(request.body)

        // Create a unique code with Short Unique ID library
        const generate = new ShortUniqueId({ length: 6 })
        const code = String(generate()).toUpperCase()

        try {
            // Verify if there is a loggedUser
            await request.jwtVerify()
            await prisma.poll.create({
                data: {
                    title,
                    code,
                    ownerId: request.user.sub,

                    participants: {
                        create: {
                            userId: request.user.sub,
                        }
                    }
                }
            })
        } catch {
            await prisma.poll.create({
                data: {
                    title,
                    code,
                }
            })
        }

        return reply.status(201).send({ code })
        // return { title }
    })

    /** ROUTE 3 **/
    // Enter in a Poll
    // http://localhost:3333/polls/join
    fastify.post('/polls/join', {
        // User needs to be logged in
        onRequest: [authenticate]
    }, async (request, reply) => {
        const joinPollBody = z.object({
            code: z.string(),
        })

        const { code } = joinPollBody.parse(request.body)

        const poll = await prisma.poll.findUnique({
            where: {
                code,
            },
            include: {
                participants: {
                    where: {
                        userId: request.user.sub,
                    }
                }
            }
        })

        if (!poll) {
            return reply.status(400).send({
                message: "Poll not found!",
            })
        }

        if (poll.participants.length > 0) {
            return reply.status(400).send({
                message: "You already joined this poll!",
            })
        }

        if (!poll.ownerId) {
            await prisma.poll.update({
                where: {
                    id: poll.id,
                },
                data: {
                    ownerId: request.user.sub,
                }
            })
        }

        await prisma.participant.create({
            data: {
                pollId: poll.id,
                userId: request.user.sub,
            }
        })

        return reply.status(201).send()
    })

    /** ROUTE 4 **/
    // User participation polls
    // http://localhost:3333/polls
    fastify.get('/polls', {
        // User needs to be logged in
        onRequest: [authenticate]
    }, async (request) => {
        const polls = await prisma.poll.findMany({
            where: {
                participants: {
                    some: {
                        userId: request.user.sub,
                    }
                }
            },
            include: {
                _count: {
                    select: {
                        participants: true,
                    }
                },
                participants: {
                    select: {
                        id: true,

                        user: {
                            select: {
                                avatarUrl: true,
                            }
                        }
                    },
                    take: 4,
                },
                // All owner data
                owner: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            }
        })

        return { polls }
    })

    /** ROUTE 5 **/
    // Poll Info
    // http://localhost:3333/polls/1
    fastify.get('/polls/:id', {
        // User needs to be logged in
        onRequest: [authenticate]
    }, async (request) => {
        const getPollParams = z.object({
            id: z.string(),
        })

        const { id } = getPollParams.parse(request.params)

        const poll = await prisma.poll.findUnique({
            where: {
                id,
            },
            include: {
                _count: {
                    select: {
                        participants: true,
                    }
                },
                participants: {
                    select: {
                        id: true,

                        user: {
                            select: {
                                avatarUrl: true,
                            }
                        }
                    },
                    take: 4,
                },
                // All owner data
                owner: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            }
        })

        return { poll }
    })
}