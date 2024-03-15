import { ApiHandler } from "sst/node/api";
import { location } from "@Demo-Manufacturing-Kanban/core/schema";
import { db } from "@Demo-Manufacturing-Kanban/core/db";
import { eq } from "drizzle-orm";

type LocationSelect = typeof location.$inferInsert;

export const list = ApiHandler(async (event) => {
  const queryParam = event.queryStringParameters;
  try {
    let result;
    if (queryParam?.detail) {
      result = await db.query.location.findMany({
        with: { workorders: { with: { part: true } } },
      });
    } else {
      result = await db.select().from(location);
    }

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
      .insert(location)
      .values({
        // @ts-ignore
        id: undefined,
        name: data.name,
        sequence: Number(data.sequence),
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
    const result = await db.query.location.findFirst({
      where: eq(location.id, Number(id)),
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
  const data: (typeof location.$inferInsert)[] = JSON.parse(event.body);

  // extremely inefficient to update each object individually
  // maybe have a separate database model for sequencing?
  try {
    // why is this faster?
    data.map(
      async (n) =>
        await db
          .update(location)
          .set({ name: n.name, sequence: n.sequence })
          .where(eq(location.id, n.id))
    );
    // why is this slow?
    // await db.transaction(async (tx) => {
    //   await Promise.all(
    //     data.map((n) =>
    //       tx
    //         .update(location)
    //         .set({ name: n.name, sequence: n.sequence })
    //         .where(eq(location.id, n.id))
    //     )
    //   );
    // });
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
      .update(location)
      .set({ name: data.name, sequence: Number(data.sequence) })
      .where(eq(location.id, Number(id)))
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
      .delete(location)
      .where(eq(location.id, Number(id)))
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
