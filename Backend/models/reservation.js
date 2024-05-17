import { serial, integer, timestamp, decimal, pgSchema, uuid } from "drizzle-orm/pg-core";
import { localizations } from "./localization.js";
import { users } from "./user.js";
export const reservationSchema = pgSchema("reservations");
export const reservations = reservationSchema.table('reservations', {
    id: serial('id').primaryKey(),
    localization_id: integer('localization_id').references(() => localizations.id),
    user_id: uuid('user_id').references(() => users.uuid),
    start_date: timestamp('start_date').notNull(),
    end_date: timestamp('end_date').notNull(),
    price: decimal('price').notNull()
});
