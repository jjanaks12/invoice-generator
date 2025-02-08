import { PrismaClient } from '@prisma/client'
import { type H3Event } from 'h3'
import { getServerSession } from "#auth"

import { InvoiceDetail } from '~/app'
import moment from 'moment'

const prisma = new PrismaClient()
export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<InvoiceDetail>(event)
  const { user } = await getServerSession(event)
  const date = moment(body.date, 'YYYY-MM-DD')

  const currency = await prisma.currency.findFirstOrThrow({
    where: {
      code: body.currency
    }
  })

  await prisma.invoice.create({
    data: {
      date: date.toISOString(),
      invoice_no: body.invoice_no,
      from_name: body.from_name,
      from_email: body.from_email,
      from_address: body.from_address,
      from_city: body.from_city,
      from_state: body.from_state,
      from_country: body.from_country,
      from_post_code: body.from_post_code,
      to_name: body.to_name,
      to_email: body.to_email,
      to_address: body.to_address,
      to_city: body.to_city,
      to_state: body.to_state,
      to_country: body.to_country,
      to_post_code: body.to_post_code,
      bank_name: body.bank_name,
      bank_branch: body.bank_branch,
      bank_account_holder_name: body.bank_account_holder_name,
      bank_account_number: body.bank_account_number,
      bank_swift_code: body.bank_swift_code,
      currencyId: currency.id,
      userId: user.id
    }
  })

  return body
})
