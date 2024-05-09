import { serial, varchar, pgSchema, doublePrecision, boolean, timestamp } from "drizzle-orm/pg-core";
export const localizationSchema = pgSchema("localizations");
export const localizations = localizationSchema.table('localizations', {
    id: serial('id').primaryKey(),
    display_name: varchar('display_name').notNull(),
    street: varchar('street').notNull(),
    city: varchar('city').notNull(),
    postal_code: varchar('postal_code').notNull(),
    gps_lat: doublePrecision('gps_lat').notNull(),
    gps_long: doublePrecision('gps_long').notNull(),
    isActive: boolean('isActive').notNull().default(false),
    description: varchar('description'),
    res_start_date: timestamp('res_start_date'),
    res_end_date: timestamp('res_end_date')
});
