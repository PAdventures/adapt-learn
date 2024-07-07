DO $$ BEGIN
 CREATE TYPE "public"."account_role" AS ENUM('USER', 'STUDENT', 'TEACHER', 'COURSE_ADMIN', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"account_id" bigserial PRIMARY KEY NOT NULL,
	"auth_uid" text NOT NULL,
	"username" text NOT NULL,
	"display_name" text,
	"is_oauth" boolean NOT NULL,
	"role" "account_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "accounts_auth_uid_unique" UNIQUE("auth_uid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_sessions" (
	"course_session_id" bigserial PRIMARY KEY NOT NULL,
	"course_id" bigint,
	"account_id" bigint,
	"questions" json NOT NULL,
	"exp_gained" smallint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"course_id" bigserial PRIMARY KEY NOT NULL,
	"owner_id" bigint,
	"name" varchar(256) NOT NULL,
	"description_preview" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth_accounts" (
	"provider_id" text NOT NULL,
	"provider_user_id" text NOT NULL,
	"account_id" bigint NOT NULL,
	CONSTRAINT "oauth_accounts_provider_id_provider_user_id_pk" PRIMARY KEY("provider_id","provider_user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"question_id" bigserial PRIMARY KEY NOT NULL,
	"course_id" bigint,
	"question" text NOT NULL,
	"option_1" text NOT NULL,
	"option_2" text NOT NULL,
	"option_3" text NOT NULL,
	"option_4" text NOT NULL,
	"answer" char(1) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teacher_to_students" (
	"student_id" bigint NOT NULL,
	"teacher_id" bigint NOT NULL,
	CONSTRAINT "teacher_to_students_student_id_teacher_id_pk" PRIMARY KEY("student_id","teacher_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_sessions" ADD CONSTRAINT "course_sessions_course_id_courses_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_sessions" ADD CONSTRAINT "course_sessions_account_id_accounts_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("account_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_owner_id_accounts_account_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."accounts"("account_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_account_id_accounts_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("account_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_course_id_courses_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teacher_to_students" ADD CONSTRAINT "teacher_to_students_student_id_accounts_account_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."accounts"("account_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teacher_to_students" ADD CONSTRAINT "teacher_to_students_teacher_id_accounts_account_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."accounts"("account_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "course_sessions_course_id_idx" ON "course_sessions" ("course_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "course_sessions_account_id_idx" ON "course_sessions" ("account_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "courses_owner_id_idx" ON "courses" ("owner_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "oauth_accounts_account_id_idx" ON "oauth_accounts" ("account_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "questions_course_id_idx" ON "questions" ("course_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "teacher_to_students_student_id_idx" ON "teacher_to_students" ("student_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "teacher_to_students_teacher_id_idx" ON "teacher_to_students" ("teacher_id");