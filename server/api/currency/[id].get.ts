import { PrismaClient } from "@prisma/client"
import { type H3Event } from 'h3'

const prisma = new PrismaClient()
export default defineEventHandler(async (event: H3Event) => {
  const id = event.context.params?.id
  return await prisma.currency.findFirstOrThrow({ where: { id } })
})
