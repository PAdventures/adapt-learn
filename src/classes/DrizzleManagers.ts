import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schemas from "~/database/schemas.ts"
import { Drizzle } from "./DrizzleClient.ts";
import { eq } from "drizzle-orm";

export class _DrizzleManger extends Drizzle {
    private _accounts = new AccountsManager(this.drizzleClient);

    public get accounts(): AccountsManager {
        return this._accounts;
    }
}

class AccountsManager {
    constructor(private drizzleClient: PostgresJsDatabase<typeof schemas>) {}

    public async create(data: schemas.NewAccount) {
        const existingAccount = await this.getOneByAuthUid(data.authUid)
        if (existingAccount && existingAccount.username === data.username) {
            return new Error("<AccountManager>.create user already exists")
        }
        
        const queryResult = await this.drizzleClient.insert(schemas.accounts)
            .values(data)
            .returning()

        if (queryResult.length > 1) {
            return new Error(`<AccountManager>.create SQL query resulted in more than 1 row. Expected 0 or 1, got ${queryResult.length}`)
        }

        return queryResult.length === 1 ? null : new Error("<AccountManager>.create SQL query failed to insert the data");
    }

    public async getOneById(accountId: bigint) {
        const queryResult = await this.drizzleClient.select()
            .from(schemas.accounts)
            .where(
                eq(schemas.accounts.accountId, accountId)
            )
        if (queryResult.length > 1) {
            throw new Error(`<AccountManager>.getOneById SQL query resulted in more than 1 row. Expected 0 or 1, got ${queryResult.length}`)
        }

        return queryResult.length === 1 ? queryResult.at(0)! : undefined
    }

    public async getOneByAuthUid(authUid: string) {
        const queryResult = await this.drizzleClient.select()
            .from(schemas.accounts)
            .where(
                eq(schemas.accounts.authUid, authUid)
            )
        if (queryResult.length > 1) {
            throw new Error(`<AccountManager>.getOneByAuthUid SQL query resulted in more than 1 row. Expected 0 or 1, got ${queryResult.length}`)
        }

        return queryResult.length === 1 ? queryResult.at(0)! : undefined
    }

    public async getOneByUsername(username: string) {
        const queryResult = await this.drizzleClient.select()
            .from(schemas.accounts)
            .where(
                eq(schemas.accounts.username, username)
            )

        if (queryResult.length > 1) {
            throw new Error(`<AccountManager>.getOneByUsername SQL query resulted in more than 1 row. Expected 0 or 1, got ${queryResult.length}`)
        }

        return queryResult.length === 1 ? queryResult.at(0)! : undefined
    }
}

export const DrizzleManager = new _DrizzleManger()