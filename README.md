# MOOD

## Fullstack AI Next.js App with Clerk / PlanetScale / Prisma / openAI

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Authentications

The easiest way to authenticate to use [Clerk](https://clerk.com/). After sign up and creating a new app that would redirect us to [quickstart page](https://clerk.com/docs/quickstarts/nextjs) for next steps.

Clerk is the third-party authentication provider for the application

```bash
npm i @clerk/nextjs
```

**Add Clerk secrets to .env.local**

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXX
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/journal
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/new-user
```

## PlanetScale Serverless SQL Database

The easiest way to connect DB is [PlanetScale](https://planetscale.com/) that provides service database that run always. Create an account and follow its instructions.

1. Create a [PlanetScale Database](https://planetscale.com/)
2. Install [pscale CLI](https://github.com/planetscale/cli#installation)
3. Use the CLI to connect to the DB: `pscale auth login`
4. Create a `dev` database branch: `pscale branch create mood dev`
5. Start the connection: `pscale connect mood dev --port 3309`

Last command will update our `.env.local` with below details

```
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_NAME=mood
DATABASE_USERNAME=XXX
DATABASE_PASSWORD=XXX
```

## Database ORM/Schema

The easiest way to use DB schema is [Prisma](https://www.prisma.io/) that provides DB agnostic schema for our app.

- Initialise Prisma: `npx prisma init`
- After initialising our prisma, we will have `.env` file and `prisma` folder in our root.
- `schema.prisma` is our place to write our schemas but before we write any schema let's change provider from `postgresql` to `mysql` that we will use with planetscale shown here [Prisma Quickstart](https://planetscale.com/docs/prisma/prisma-quickstart) and also add another section for our relation mode to datasource db `relationMode = "prisma"`. This section will make sure prisma will handle our relationships not the database. With planet scale, it will do migration for us so we don't need to run `npx prisma migrate` command ever again.
- We also need to update our DATABASE_URL in `.env` file to `DATABASE_URL = 'mysql://root@127.0.0.1:3309/mood'`
- Also make sure we add .env file in `.gitignore`
- Connect our pscale database from terminal `pscale connect mood dev --port 3309` It may ask you to auth before run this command. Now our DB available on `127.0.0.1:3309` through planetscale.
- After adding our schema we need to run `npx prisma db push`. Our database is now in sync with your Prisma schema. We also see our new table in planetscale dashboard under dev branches/dev.
- Formatting prisma schema automatically: `npx prisma format`
- Open Prisma Studio to see our record in browser: `npx prisma studio`

## OpenAI API Account Setup

1. Create an [openai.com](https://openai.com/) account
2. Select the `API` App.
3. Create an [API Key](https://platform.openai.com/account/api-keys)
4. Copy/Paste the key into your into `.env.local` using the variable `OPENAI_API_KEY`

## Testing

- Used vitest for testing
- In order to run tests, use `npm run test`
