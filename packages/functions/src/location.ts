import { ApiHandler } from "sst/node/api";
import { location } from "@Demo-Manufacturing-Kanban/core/schema";
import { db } from "@Demo-Manufacturing-Kanban/core/db";
import { eq } from "drizzle-orm";

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
