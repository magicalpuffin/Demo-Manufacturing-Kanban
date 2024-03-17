import { ApiHandler } from "sst/node/api";
import { part } from "@Demo-Manufacturing-Kanban/core/schema";
import { db } from "@Demo-Manufacturing-Kanban/core/db";
import { eq } from "drizzle-orm";

export const list = ApiHandler(async (event) => {
  try {
    const result = await db.select().from(part);

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
      .insert(part)
      .values({
        // @ts-ignore
        id: undefined,
        name: data.name,
        description: data.description,
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
    const result = await db.query.part.findFirst({
      where: eq(part.id, Number(id)),
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
      .update(part)
      .set({ name: data.name, description: data.description })
      .where(eq(part.id, Number(id)))
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
      .delete(part)
      .where(eq(part.id, Number(id)))
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
