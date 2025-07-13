This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your environment variables:

```bash
# Create a .env.local file and add your Logo.dev API key
LOGO_DEV_API_KEY=your_api_key_here
```

Get your API key from [logo.dev](https://logo.dev).

Then, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Build Process

This project includes a build-time logo fetching system that downloads company logos statically for better performance and security:

```bash
# Fetch logos manually (optional - runs automatically during build)
npm run fetch-logos

# Build the project (automatically fetches logos first)
npm run build
```

The build process:

1. Reads company data from `src/data/companies.json`
2. Fetches logos from Logo.dev API during build time
3. Saves logos to `public/logos/` directory
4. Creates a mapping file at `src/data/logo-mapping.json`
5. Builds the Next.js application

This approach keeps the API key secure (server-side only) and improves runtime performance by serving static assets.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
