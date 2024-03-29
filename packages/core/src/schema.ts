import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  smallint,
  smallserial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const location = pgTable("location", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  sequence: smallint("sequence").default(0).notNull(),
});

export const part = pgTable("part", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
});

export const workOrder = pgTable("workOrder", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  priority: smallint("priority").default(0).notNull(),
  locationId: smallint("location_id")
    .references(() => location.id)
    .notNull(),
  partId: smallint("part_id")
    .references(() => part.id)
    .notNull(),
});

export const workOrderRelation = relations(workOrder, ({ one }) => ({
  location: one(location, {
    fields: [workOrder.locationId],
    references: [location.id],
  }),
  part: one(part, {
    fields: [workOrder.partId],
    references: [part.id],
  }),
}));

export const locationRelation = relations(location, ({ many }) => ({
  workorders: many(workOrder),
}));
