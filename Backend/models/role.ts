import { serial, varchar,text ,pgTable, pgSchema } from "drizzle-orm/pg-core";

export const roleSchema = pgSchema("roles");
export const roles = roleSchema.table('roles', {
    id: serial('id').primaryKey(),
    display_name: varchar('display_name').notNull(),
    name: varchar('name').notNull(),
    description: text('description')
});