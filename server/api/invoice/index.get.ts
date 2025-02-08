import { PrismaClient } from '@prisma/client'
import { type H3Event } from 'h3'
import { getServerSession } from '#auth'

const prisma = new PrismaClient()
export default defineEventHandler(async (event: H3Event) => {
  const { user } = await getServerSession(event)

  return await prisma.invoice.findMany({
    where: {
      userId: user.id
    }
  })
})
