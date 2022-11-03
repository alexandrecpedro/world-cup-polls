/** AUTHENTICATION ROUTES **/
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function authRoutes(fastify: FastifyInstance) {
    /** ROUTE 1 **/
    // Validate JWT = Logged User
    // http://localhost:3333/me
    fastify.get('/me', {
        onRequest: [authenticate]
    }, async (request) => {
        return { user: request.user }
    })

    /** ROUTE 2 **/
    // Create an user if it does not exist
    // http://localhost:3333/users
    fastify.post('/users', async (request) => {
        // Access token format (ZOD Schema)
        const createUserBody = z.object({
            access_token: z.string(),
        })

        const { access_token } = createUserBody.parse(request.body)

        // Connect with Google API
        const userResponseAwait = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        // Convert userData info into JSON
        const userData = await userResponseAwait.json()

        // User data type schema with ZOD
        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url(),
        })

        // Check if userInfo from Google corresponds to that of ZOD's Schema
        const userInfo = userInfoSchema.parse(userData)

        // Find an specific user
        let user = await prisma.user.findUnique({
            where: {
                googleId: userInfo.id,
            }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.picture,
                }
            })
        }

        /** JWT **/
        // Token Generation
        const token = fastify.jwt.sign({
            name: user.name,
            avatarUrl: user.avatarUrl,
        }, {
            sub: user.id,
            expiresIn: '7 days',
        })

        return { token }
    })
}