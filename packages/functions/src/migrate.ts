import { ApiHandler } from "sst/node/api";

import { db } from "@Demo-Manufacturing-Kanban/core/db";
import { migrate } from "drizzle-orm/aws-data-api/pg/migrator";

export const handler = ApiHandler(async (_evt) => {
  await migrate(db, { migrationsFolder: "drizzle" });

  return {
    statusCode: 200,
    body: `Run migration complete`,
  };
});
