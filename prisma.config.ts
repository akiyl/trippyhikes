// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    // use the DATABASE_URL env variable, not the Supabase HTTP API URL
    url: process.env.DATABASE_URL!,
  },
});
