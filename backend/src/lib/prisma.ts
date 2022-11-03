/** DATABASE CONNECTION **/
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    // Debug all queries being called
    log: ['query'],
})