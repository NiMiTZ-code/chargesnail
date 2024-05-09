import { serial, varchar, pgSchema } from "drizzle-orm/pg-core";
export const plugSchema = pgSchema("plugs");
export const plugs = plugSchema.table('plugs', {
    id: serial('id').primaryKey(),
    varchar: varchar('type').notNull()
});
