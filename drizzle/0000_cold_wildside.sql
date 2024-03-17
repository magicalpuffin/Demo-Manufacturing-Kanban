CREATE TABLE IF NOT EXISTS "location" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"sequence" smallint DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "part" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workOrder" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"location_id" smallint NOT NULL,
	"part_id" smallint NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workOrder" ADD CONSTRAINT "workOrder_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workOrder" ADD CONSTRAINT "workOrder_part_id_part_id_fk" FOREIGN KEY ("part_id") REFERENCES "part"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
