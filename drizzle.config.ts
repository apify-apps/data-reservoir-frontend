import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/database/schema.ts",
  dialect: 'postgresql',
  migrations: {
    prefix: 'unix'
  },
  dbCredentials: {
    url: process.env.POSTGRES as string
  }
});