import { ApiHandler } from "sst/node/api";
import { db } from "@Demo-Manufacturing-Kanban/core/db";

export const list = ApiHandler(async (event) => {
  try {
    let workorders = await db.query.workOrder.findMany();
    let locations = await db.query.location.findMany();
    let parts = await db.query.part.findMany();

    return {
      statusCode: 200,
      body: JSON.stringify({
        workorders,
        locations,
        parts,
      }),
    };
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
});
