import { PrismaClient } from "@prisma/client"

const prisma  = new PrismaClient()
export default defineEventHandler(async (event) => {
  return {
    invoices: await prisma.invoice.count(),
    history: await prisma.invoiceHistory.count()
  }
})
