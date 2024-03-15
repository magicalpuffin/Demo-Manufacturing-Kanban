import { workOrder, location, part } from '@Demo-Manufacturing-Kanban/core/schema';

// issues with drizzle pgserial
export type WorkOrderSelect = typeof workOrder.$inferSelect;
export type WorkOrderInsert = typeof workOrder.$inferInsert;

export type PartSelect = typeof part.$inferSelect;

export type LocationSelect = typeof location.$inferSelect;

// detail types might not be useful? Could manage through stores?
export type LocationDetailSelect = LocationSelect & {
	workorders: WorkOrderDetailSelect[];
};

export type WorkOrderDetailSelect = WorkOrderSelect & {
	location: LocationSelect;
} & { part: PartSelect };
