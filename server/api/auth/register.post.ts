import { PrismaClient, User } from "@prisma/client"
import { ValidationError } from "yup"
import bcrypt from 'bcrypt'

import { APIError, APIResponse } from "~/app"
import { formSchema } from "~/lib/validation-schemas/RegisterSchema"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  let res: APIResponse<User> = {
    status: 'failed',
    message: ''
  }
  let status = 404

  const body = await readBody<User>(event)
  await formSchema.validate(body, {
    strict: true,
    abortEarly: false
  })
    .then(async () => {
      const userExists = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      })

      if (userExists)
        res = {
          status: 'failed',
          message: `Email ${body.email} already exists`
        }
      else {
        const hash = await bcrypt.hash(body.password, 10)

        const user = await prisma.user.create({
          data: {
            email: body.email,
            first_name: body.first_name,
            last_name: body.last_name,
            middle_name: body.middle_name,
            password: hash
          }
        })

        res = {
          status: 'success',
          data: user
        }
      }
    })
    .catch((e: ValidationError) => {
      const errors: APIError = {}
      status = 400

      e.inner.forEach((validationError: any) => {
        errors[validationError.path] = validationError.errors
      })

      res = {
        status: "failed",
        message: 'validation Error',
        errors: errors
      }
    })
  return res
})
