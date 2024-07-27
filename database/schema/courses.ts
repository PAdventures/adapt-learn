// Import the needed methods from Drizzle
import { bigserial, bigint, text, pgTable, varchar, timestamp, index } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

// Import the needed tables to define the relationships between them and the courses table
import { accounts } from "./accounts.ts";
import { questions } from "./questions.ts";

// Defining the courses table
export const courses = pgTable('courses', {
    courseId: bigserial('course_id', { mode: 'bigint' }).primaryKey(),
    ownerId: bigint('owner_id', { mode: 'bigint' }).references(() => accounts.accountId).notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    descriptionPreview: text('description_preview').notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).$onUpdate(() => new Date())
}, (table) => {
    return {
        ownerIndex: index('courses_owner_id_idx').on(table.ownerId)
    }
})

// Defining the courses table relations
export const coursesRelations = relations(courses, ({ one, many }) => ({
    account: one(accounts, {
        fields: [courses.ownerId],
        references: [accounts.accountId],
        relationName: 'courses_accounts_relations'
    }),
    questions: many(questions)
}));

// Defining the course table types
export type Course = InferSelectModel<typeof courses>;
export type NewCourse = InferInsertModel<typeof courses>;