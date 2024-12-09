import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  const history = await prisma.invoiceHistory.findFirst({
    where: { id }
  })

  return history
})