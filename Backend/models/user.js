import { sql } from "drizzle-orm";
import { varchar, serial, pgSchema } from "drizzle-orm/pg-core";
export const userSchema = pgSchema("users");
export const users = userSchema.table('users', {
    uuid: serial('uuid').default(sql `gen_random_uuid()`).primaryKey(),
    name: varchar('name').notNull(),
    surname: varchar('surname').notNull(),
    email: varchar('email').unique().notNull(),
    password: varchar('password').notNull(),
    //role: integer('role').references(() => role.id),
});
/* export const userRelations = relations(users, ({one})=>({
    //role: one(role),
})); */
