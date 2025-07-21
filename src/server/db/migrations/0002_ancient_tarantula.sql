CREATE TABLE "event_speakers" (
	"event_id" uuid NOT NULL,
	"speaker_id" uuid NOT NULL,
	CONSTRAINT "event_speakers_event_id_speaker_id_pk" PRIMARY KEY("event_id","speaker_id")
);
--> statement-breakpoint
ALTER TABLE "speaker" DROP CONSTRAINT "speaker_event_id_event_id_fk";
--> statement-breakpoint
ALTER TABLE "event_speakers" ADD CONSTRAINT "event_speakers_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_speakers" ADD CONSTRAINT "event_speakers_speaker_id_speaker_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "public"."speaker"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "speaker" DROP COLUMN "event_id";