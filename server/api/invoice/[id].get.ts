import { type H3Event } from 'h3'
import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default defineEventHandler(async (event: H3Event) => {
  const { user } = await getServerSession(event)
  const id = event.context.params?.id

  return await prisma.invoice.findFirst({
    where: {
      id,
      userId: user.id
    }
  })
})
