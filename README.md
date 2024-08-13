# Introduction

I am trying to make and app that could generate invoice. For now it could generate and download it as PDF. We can also save it for future use. I have used Nuxt 3 with Vue 3. For storage i have used Pinia with persisted state to save invoices on localstorage. Printd to use HTML and CSS to save as PDF. Vee-validate and Yup for validation. And finally moment for handling date and time.

#### Future plan
I am planning to use Nitro js for api communication, Prisma for ORM and sidebase for authentication.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Productiona

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
