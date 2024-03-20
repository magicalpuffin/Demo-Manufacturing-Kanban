import { initTRPC, TRPCError } from "@trpc/server";
import { db } from "./db";
import { z } from "zod";
import { workOrder, location, part } from "./schema";
import { eq, count } from "drizzle-orm";

import {
  workorderInsert,
  workorderSelect,
  locationInsert,
  locationSelect,
  partInsert,
  partSelect,
} from "./zodSchema";

export const t = initTRPC.create();

export const appRouter = t.router({
  listAll: t.procedure.query(async () => {
    const [workorders, locations, parts] = await Promise.all([
      db.query.workOrder.findMany(),
      db.query.location.findMany(),
      db.query.part.findMany(),
    ]);
    return { workorders, locations, parts };
  }),
  listWorkorder: t.procedure.query(async () => {
    const workorders = await db.query.workOrder.findMany();
    // return array of obj directly? this feels illegal
    return workorders;
  }),
  createWorkorder: t.procedure.input(workorderInsert).mutation(async (opt) => {
    const total = await db.select({ count: count() }).from(workOrder);

    if (total[0].count > 20) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Too many workorders",
      });
    }

    const newWorkorder = await db
      .insert(workOrder)
      .values(
        // @ts-ignore
        opt.input
      )
      .returning();

    return newWorkorder;
  }),
  updateListWorkorder: t.procedure
    .input(z.array(workorderSelect))
    .mutation(async (opt) => {
      // workaround to update each workorder individually
      await db.transaction(async (tx) => {
        await Promise.all(
          opt.input.map((n) =>
            tx
              .update(workOrder)
              .set({
                // can't set using entire object due to id
                name: n.name,
                priority: n.priority,
                locationId: n.locationId,
                partId: n.partId,
              })
              .where(eq(workOrder.id, n.id))
          )
        );
      });
      // workaround for returning data
      return opt.input;
    }),
  deleteWorkorder: t.procedure.input(workorderSelect).mutation(async (opt) => {
    const deletedWorkorder = await db
      .delete(workOrder)
      .where(eq(workOrder.id, opt.input.id))
      .returning();

    return deletedWorkorder;
  }),
  listLocation: t.procedure.query(async () => {
    const locations = await db.query.location.findMany();
    return locations;
  }),
  createLocation: t.procedure.input(locationInsert).mutation(async (opt) => {
    const total = await db.select({ count: count() }).from(location);

    if (total[0].count > 20) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Too many locations",
      });
    }

    const newLocation = await db
      .insert(location)
      .values(
        // @ts-ignore
        opt.input
      )
      .returning();

    return newLocation;
  }),
  updateListLocation: t.procedure
    .input(z.array(locationSelect))
    .mutation(async (opt) => {
      // workaround to update each individually
      await db.transaction(async (tx) => {
        await Promise.all(
          opt.input.map((n) =>
            tx
              .update(location)
              .set({
                name: n.name,
                sequence: n.sequence,
              })
              .where(eq(location.id, n.id))
          )
        );
      });
      // workaround for returning data
      return opt.input;
    }),
  deleteLocation: t.procedure.input(locationSelect).mutation(async (opt) => {
    const deletedLocation = await db
      .delete(location)
      .where(eq(location.id, opt.input.id))
      .returning();

    return deletedLocation;
  }),
  listPart: t.procedure.query(async () => {
    const parts = await db.query.part.findMany();
    return parts;
  }),
  createPart: t.procedure.input(partInsert).mutation(async (opt) => {
    const total = await db.select({ count: count() }).from(part);

    if (total[0].count > 20) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Too many parts",
      });
    }

    const newPart = await db
      .insert(part)
      .values(
        // @ts-ignore
        opt.input
      )
      .returning();

    return newPart;
  }),
  updatePart: t.procedure.input(z.array(partSelect)).mutation(async (opt) => {
    // workaround to update each individually
    await db.transaction(async (tx) => {
      await Promise.all(
        opt.input.map((n) =>
          tx
            .update(part)
            .set({
              // can't set using entire object due to id
              name: n.name,
              description: n.description,
            })
            .where(eq(part.id, n.id))
        )
      );
    });
    // workaround for returning data
    return opt.input;
  }),
  deletePart: t.procedure.input(partSelect).mutation(async (opt) => {
    const deletePart = await db
      .delete(part)
      .where(eq(part.id, opt.input.id))
      .returning();

    return deletePart;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
