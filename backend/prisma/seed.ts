import { PrismaClient } from "@prisma/client"

/** DATABASE (Connection) **/
const prisma = new PrismaClient()

async function main() {
    /** USER CREATION **/
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john.doe@gmail.com",
            googleId: "102109400489161399714",
            avatarUrl: "https://github.com/diego3g.png",
        }
    })

    /** POLL CREATION **/
    const poll = await prisma.poll.create({
        data: {
            title: "Example Poll",
            code: "BOL123",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    /** GAME CREATION **/
    await prisma.game.create({
        data: {
            date: "2022-11-02T12:00:00.201Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR",
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-05T12:00:00.201Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_pollId: {
                                userId: user.id,
                                pollId: poll.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()