import { getServerSession } from "#auth"
import { PrismaClient } from "@prisma/client"
import type { H3Event } from 'h3'

const prisma = new PrismaClient()
export default defineEventHandler(async (event: H3Event) => {
  const { user } = await getServerSession(event)

  if (!user) return { status: "unauthenticated!" };

  const histories = await prisma.invoiceHistory.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return histories
})
