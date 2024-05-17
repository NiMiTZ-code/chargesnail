import { integer, varchar, pgSchema, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { roles } from "./role.js";
export const userSchema = pgSchema("users");
export const users = userSchema.table('users', {
    uuid: uuid('uuid').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    surname: varchar('surname').notNull(),
    email: varchar('email').unique().notNull(),
    password: varchar('password').notNull(),
    role: integer('role').default(3).references(() => roles.id),
});
export const userRelations = relations(users, ({ one }) => ({
    role: one(roles),
}));
