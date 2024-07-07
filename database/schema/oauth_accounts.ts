// Import the needed methods from Drizzle
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, bigint, primaryKey, index } from "drizzle-orm/pg-core";

// Import the needed tables to define the relationships between them and the oauth_accounts table
import { accounts } from "./accounts.ts";

// Defining the accounts table
export const oauthAccounts = pgTable('oauth_accounts', {
    providerId: text('provider_id').notNull(),
    providerUserId: text('provider_user_id').notNull(),
    accountId: bigint('account_id', { mode: 'bigint' }).notNull().references(() => accounts.accountId)
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
        accountIndex: index('oauth_accounts_account_id_idx').on(table.accountId)
    }
});

// Defining the oauth_accounts table relations
export const oauthAccountRelations = relations(oauthAccounts, ({ one }) => ({
    account: one(accounts, {
        fields: [oauthAccounts.accountId],
        references: [accounts.accountId],
        relationName: 'oauth_accounts_account_relation'
    })
}))

// Defining the oauth_accounts table types
export type OAuthAccountType = InferSelectModel<typeof oauthAccounts>;
export type NewOAuthAccountType = InferInsertModel<typeof oauthAccounts>;