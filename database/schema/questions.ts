// Import the needed methods from Drizzle
import { bigserial, bigint, text, char, pgTable, timestamp, index } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';

// Import the needed tables to define the relationships between them and the questions table
import { courses } from './courses.ts';

// Defining the questions table
export const questions = pgTable('questions', {
    questionId: bigserial('question_id', { mode: 'bigint' }).primaryKey(),
    courseId: bigint('course_id', { mode: 'bigint' }).references(() => courses.courseId),
    question: text('question').notNull(),
    option1: text('option_1').notNull(),
    option2: text('option_2').notNull(),
    option3: text('option_3').notNull(),
    option4: text('option_4').notNull(),
    answer: char('answer', { length: 1 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).$onUpdate(() => new Date())
}, (table) => {
    return {
        courseIndex: index('questions_course_id_idx').on(table.courseId)
    }
})

// Defining the questions table relations
export const questionsRelations = relations(questions, ({ one }) => ({
    course: one(courses, {
        fields: [questions.courseId],
        references: [courses.courseId],
        relationName: 'questions_courses_relation'
    })
}));

// Defining the questions table types
export type Question = InferSelectModel<typeof questions>;
export type NewQuestion = InferInsertModel<typeof questions>;