// Import the needed methods from Drizzle
import { bigserial, bigint, json, smallint, pgTable, timestamp, index } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';

// Import the needed tables to define the relationships between them and the course_sessions table
import { courses } from "./courses.ts";
import { accounts } from "./accounts.ts";

// Defining the course_sessions table
export const courseSessions = pgTable('course_sessions', {
    courseSessionId: bigserial('course_session_id', { mode: 'bigint' }).primaryKey(),
    courseId: bigint('course_id', { mode: 'bigint' }).references(() => courses.courseId),
    accountId: bigint('account_id', { mode: 'bigint' }).references(() => accounts.accountId),
    questions: json('questions').notNull().$type<CourseSessionQuestionsJSONType>(),
    expGained: smallint('exp_gained').notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).$onUpdate(() => new Date())
}, (table) => {
    return {
        courseIndex: index('course_sessions_course_id_idx').on(table.courseId),
        accountIndex: index('course_sessions_account_id_idx').on(table.accountId)
    }
})

// Defining the courses table relations
export const courseSessionsRelations = relations(courseSessions, ({ one }) => ({
    account: one(accounts, {
        fields: [courseSessions.accountId],
        references: [accounts.accountId],
        relationName: 'course_sessions_accounts_relations'
    }),
    course: one(courses, {
        fields: [courseSessions.accountId],
        references: [courses.courseId],
        relationName: 'course_sessions_courses_relations'
    }),
}));

// Defining the course table types
export type CourseSessionType = InferSelectModel<typeof courseSessions>;
export type NewCourseSessionType = InferInsertModel<typeof courseSessions>;

export type CourseSessionQuestionsJSONType = {
    questionId: bigint,
    answerSelected: 1 | 2 | 3 | 4,
    correctAnswer: 1 | 2 | 3 | 4,
}