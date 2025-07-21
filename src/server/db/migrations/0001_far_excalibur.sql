CREATE TABLE "speaker" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"event_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "speaker" ADD CONSTRAINT "speaker_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;