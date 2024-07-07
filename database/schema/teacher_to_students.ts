// Import the needed methods from Drizzle
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgTable, bigint, primaryKey, index } from "drizzle-orm/pg-core";

// Import the needed tables to define the relationships between them and the teacher_to_students table
import { accounts } from "./accounts.ts";

// Defining the teacher_to_students table
export const teacherToStudents = pgTable('teacher_to_students', {
    studentId: bigint('student_id', { mode: 'bigint' }).notNull().references(() => accounts.accountId),
    teacherId: bigint('teacher_id', { mode: 'bigint' }).notNull().references(() => accounts.accountId)
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.studentId, table.teacherId] }),
        studentIndex: index('teacher_to_students_student_id_idx').on(table.studentId),
        teacherIndex: index('teacher_to_students_teacher_id_idx').on(table.teacherId),
    }
})

// Defining the teacher_to_students table relations
export const teacherToStudentsRelations = relations(teacherToStudents, ({ one }) => ({
    student: one(accounts, {
        fields: [teacherToStudents.studentId],
        references: [accounts.accountId],
        relationName: 'teacher_to_students_student_relation'
    }),
    teacher: one(accounts, {
        fields: [teacherToStudents.teacherId],
        references: [accounts.accountId],
        relationName: 'teacher_to_students_teacher_relation'
    })
}));

// Defining the teacher_to_students table types
export type TeacherToStudentType = InferSelectModel<typeof teacherToStudents>;
export type NewTeacherToStudentType = InferInsertModel<typeof teacherToStudents>;