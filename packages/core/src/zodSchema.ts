import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { workOrder, location, part } from "./schema";

export const workorderInsert = createInsertSchema(workOrder, {
  id: z.undefined(),
});
export const workorderSelect = createSelectSchema(workOrder);

export const locationInsert = createInsertSchema(location, {
  id: z.undefined(),
});
export const locationSelect = createSelectSchema(location);

export const partInsert = createInsertSchema(part, { id: z.undefined() });
export const partSelect = createSelectSchema(part);

// this feels excessive
// getting type from zod
export type workorderSelectType = z.infer<typeof workorderSelect>;
export type workorderInsertType = z.infer<typeof workorderInsert>;

export type locationSelectType = z.infer<typeof locationSelect>;
export type locationInsertType = z.infer<typeof locationInsert>;

export type partSelectType = z.infer<typeof partSelect>;
export type partInsertType = z.infer<typeof partInsert>;
