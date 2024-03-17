import { ApiHandler } from "sst/node/api";
import { workOrder } from "@Demo-Manufacturing-Kanban/core/schema";
import { db } from "@Demo-Manufacturing-Kanban/core/db";
import { eq } from "drizzle-orm";

export const list = ApiHandler(async (event) => {
  try {
    const result = await db.query.workOrder.findMany({
      with: { location: true, part: true },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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

export const create = ApiHandler(async (event) => {
  if (!event.body) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true }),
    };
  }

  const data = JSON.parse(event.body);

  try {
    // bug with serialized
    // https://github.com/drizzle-team/drizzle-orm/issues/663
    const result = await db
      .insert(workOrder)
      .values({
        // @ts-ignore
        id: undefined,
        name: data.name,
        locationId: Number(data.locationId),
        partId: Number(data.partId),
      })
      .returning();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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

export const get = ApiHandler(async (event) => {
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true }),
    };
  }

  try {
    const result = await db.query.workOrder.findFirst({
      where: eq(workOrder.id, Number(id)),
      with: { location: true, part: true },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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

export const updateList = ApiHandler(async (event) => {
  if (!event.body) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true }),
    };
  }
  const data: (typeof workOrder.$inferInsert)[] = JSON.parse(event.body);

  // extremely inefficient to update each object individually
  // maybe have a separate database model for sequencing?
  try {
    // why is this faster in local?
    // data.map(
    //   async (n) =>
    //     await db
    //       .update(workOrder)
    //       .set({
    //         name: n.name,
    //         priority: n.priority,
    //         locationId: n.locationId,
    //         partId: n.partId,
    //       })
    //       .where(eq(workOrder.id, n.id))
    // );
    // why is this slow in local but better in deployment?
    await db.transaction(async (tx) => {
      await Promise.all(
        data.map((n) =>
          tx
            .update(workOrder)
            .set({
              name: n.name,
              priority: n.priority,
              locationId: n.locationId,
              partId: n.partId,
            })
            .where(eq(workOrder.id, n.id))
        )
      );
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
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

export const update = ApiHandler(async (event) => {
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true }),
    };
  }

  const data = JSON.parse(event.body);

  try {
    const result = await db
      .update(workOrder)
      .set({
        name: data.name,
        locationId: Number(data.location_id),
        partId: Number(data.part_id),
      })
      .where(eq(workOrder.id, Number(id)))
      .returning();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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

export const remove = ApiHandler(async (event) => {
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true }),
    };
  }

  try {
    const result = await db
      .delete(workOrder)
      .where(eq(workOrder.id, Number(id)))
      .returning();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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
