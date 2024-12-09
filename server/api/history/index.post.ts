import { Prisma, PrismaClient } from "@prisma/client"
import moment from "moment"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const details = {
    data: body.data,
    fields: body.fields
  } as Prisma.JsonObject

  const history = await prisma.invoiceHistory.create({
    data: {
      date: moment().utc().toISOString(),
      details
    }
  })

  return history
})
