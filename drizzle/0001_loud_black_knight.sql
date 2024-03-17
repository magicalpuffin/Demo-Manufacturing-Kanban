ALTER TABLE "location" ALTER COLUMN "sequence" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workOrder" ADD COLUMN "priority" smallint DEFAULT 0 NOT NULL;