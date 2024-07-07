// Import the needed methods from Drizzle
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgTable, pgEnum, bigserial, text, boolean, timestamp } from "drizzle-orm/pg-core";

// Import the needed tables to define the relationships between them and the accounts table
import { oauthAccounts } from "./oauth_accounts.ts";
import { teacherToStudents } from "./teacher_to_students.ts";
import { courses } from "./courses.ts";

// Defining the Enums
export const accountRole = pgEnum('account_role', [
    'USER',
    'STUDENT',
    'TEACHER',
    'COURSE_ADMIN',
    'ADMIN'
]);

// Defining the accounts table
export const accounts = pgTable('accounts', {
    accountId: bigserial('account_id', { mode: 'bigint' }).primaryKey(),
    authUid: text('auth_uid').notNull().unique(),
    username: text('username').notNull().unique(),
    displayName: text('display_name'),
    isOAuth: boolean('is_oauth').notNull(),
    role: accountRole('role').notNull(),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).$onUpdate(() => new Date())
});

// Defining the accounts table relations
export const accountsRelations = relations(accounts, ({ one, many }) => ({
    oauthAccount: one(oauthAccounts, {
        fields: [accounts.accountId],
        references: [oauthAccounts.accountId],
        relationName: 'accounts_to_oauth_accounts_relation'
    }),
    teacherToStudents: many(teacherToStudents),
    courses: many(courses)
}))

// Defining the accounts table types
export type Account = InferSelectModel<typeof accounts>;
export type NewAccount = InferInsertModel<typeof accounts>;