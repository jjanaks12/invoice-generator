import { PrismaClient } from '@prisma/client'

import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NuxtAuthHandler } from '#auth'

const prisma = new PrismaClient()

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  secret: useRuntimeConfig().authSecret,
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
        return credentials
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    session: async ({ session, token }) => {
      return Promise.resolve(session)
    }
  }
})
