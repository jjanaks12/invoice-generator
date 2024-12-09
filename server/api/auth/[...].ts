import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NuxtAuthHandler } from '#auth'

const prisma = new PrismaClient()

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NUXT_AUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials: { email: string, password: string }) => {
        if (!credentials.email && !credentials.password)
          throw createError({
            statusCode: 500,
            statusMessage: 'Either email or password missing'
          })

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user)
          throw createError({
            statusCode: 400,
            statusMessage: 'user does not exists'
          })

        if (!user.password)
          throw createError({
            statusCode: 501,
            statusMessage: 'Invalid Credential'
          })

        const correctPassword = await bcrypt.compare(credentials.password, user.password)

        if (!correctPassword)
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials'
          })

        return user
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt: ({ token, account, profile }) => {
      if (account) {
        token.sessionToken = account.session_token

      }
      return token
    },
    session: async ({ session, token }) => {
      if (token.email) {
        const userResponse = await $fetch(`/api/auth/me`, {
          method: 'POST',
          body: {
            email: token.email
          }
        })

        if (userResponse.status == 'success')
          session.user = userResponse.data as any
      }

      return Promise.resolve(session)
    }
  }
})
