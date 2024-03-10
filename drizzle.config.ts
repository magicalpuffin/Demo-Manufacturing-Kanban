import type { Config } from "drizzle-kit";

const { PRIVATE_DB_URL } = process.env;
if (!PRIVATE_DB_URL) {
  throw new Error("No url");
}
export default {
  schema: "./packages/core/src/schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: PRIVATE_DB_URL,
  },
} satisfies Config;
