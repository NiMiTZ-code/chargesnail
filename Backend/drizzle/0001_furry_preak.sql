CREATE SCHEMA "localizations";
--> statement-breakpoint
CREATE SCHEMA "plugs";
--> statement-breakpoint
CREATE SCHEMA "reservations";
--> statement-breakpoint
CREATE SCHEMA "roles";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "localizations"."localizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"display_name" varchar NOT NULL,
	"street" varchar NOT NULL,
	"city" varchar NOT NULL,
	"postal_code" varchar NOT NULL,
	"gps_lat" double precision NOT NULL,
	"gps_long" double precision NOT NULL,
	"isActive" boolean DEFAULT false NOT NULL,
	"description" varchar,
	"res_start_date" timestamp,
	"res_end_date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plugs"."plugs" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservations"."reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"localization_id" integer,
	"user_id" integer,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles"."roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"display_name" varchar NOT NULL,
	"name" varchar NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "users"."users" ALTER COLUMN "uuid" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users"."users" ADD COLUMN "role" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users" ADD CONSTRAINT "users_role_roles_id_fk" FOREIGN KEY ("role") REFERENCES "roles"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations"."reservations" ADD CONSTRAINT "reservations_localization_id_localizations_id_fk" FOREIGN KEY ("localization_id") REFERENCES "localizations"."localizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations"."reservations" ADD CONSTRAINT "reservations_user_id_users_uuid_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
