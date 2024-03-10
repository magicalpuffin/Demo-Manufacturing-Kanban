import { drizzle } from "drizzle-orm/aws-data-api/pg";
import * as schema from "./schema";
import { RDSData } from "@aws-sdk/client-rds-data";
import { RDS } from "sst/node/rds";

export const db = drizzle(new RDSData({}), {
  database: RDS.rds.defaultDatabaseName,
  secretArn: RDS.rds.secretArn,
  resourceArn: RDS.rds.clusterArn,
  schema,
});
