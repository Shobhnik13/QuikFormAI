DO $$ BEGIN
 CREATE TYPE "public"."field_type" AS ENUM('RadioGroup', 'Select', 'Input', 'Textarea', 'Switch');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "field_options" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text,
	"value" text,
	"question_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"user_id" text,
	"published" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text,
	"field_type" "field_type",
	"form_id" integer
);
