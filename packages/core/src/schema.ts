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
  sequence: smallint("sequence").default(0),
});

export const part = pgTable("part", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
});

export const workOrder = pgTable("workOrder", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  locationId: smallint("location_id")
    .references(() => location.id)
    .notNull(),
  partId: smallint("part_id")
    .references(() => part.id)
    .notNull(),
});
