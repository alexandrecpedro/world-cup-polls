/** USER ROUTES **/
import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

export async function userRoutes(fastify: FastifyInstance) {
    /** ROUTE 1 **/
    // Count Users
    // http://localhost:3333/users/count
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count()

        return { count }
    })
}