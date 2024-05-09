import { integer, varchar, serial, pgSchema } from "drizzle-orm/pg-core";
import { roles } from "./role.js";
export const userSchema = pgSchema("users");
export const users = userSchema.table('users', {
    uuid: serial('uuid').primaryKey(), //CHANGE SERIAL TO UUID with random default
    name: varchar('name').notNull(),
    surname: varchar('surname').notNull(),
    email: varchar('email').unique().notNull(),
    password: varchar('password').notNull(),
    role: integer('role').references(() => roles.id),
});
/* export const userRelations = relations(users, ({one})=>({
    //role: one(role),
})); */
