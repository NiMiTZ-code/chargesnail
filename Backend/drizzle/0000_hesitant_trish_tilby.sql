CREATE SCHEMA "users";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users"."users" (
	"uuid" serial PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"surname" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
