import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_URL } = process.env;
if (!DB_URL) {
  throw new Error("No url");
}
export default {
  schema: "./packages/core/src/schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: DB_URL,
  },
} satisfies Config;
