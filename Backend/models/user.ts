import { relations, sql } from "drizzle-orm";
import { integer, varchar, serial, pgTable, pgSchema, uuid } from "drizzle-orm/pg-core";
import { Relation } from "drizzle-orm";

export const userSchema = pgSchema("users");

export const users = userSchema.table('users', {
    uuid: serial('uuid').default(sql`gen_random_uuid()`).primaryKey(),
    name: varchar('name').notNull(),
    surname: varchar('surname').notNull(),
    email: varchar('email').unique().notNull(),
    password: varchar('password').notNull(),
    //role: integer('role').references(() => role.id),
});

/* export const userRelations = relations(users, ({one})=>({
    //role: one(role),
})); */
