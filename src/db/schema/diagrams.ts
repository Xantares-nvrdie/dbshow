import { pgTable, text, boolean, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { dbDialectEnum } from "./enums";
import { user } from "./auth";
import type { ParseResult, LayoutData } from "./types";

// ─── Table ────────────────────────────────────────────────────────────────────

export const diagrams = pgTable(
	"diagrams",
	{
		id: text("id")
			.primaryKey()
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),

		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		name: text("name").notNull(),
		description: text("description"),
		dialect: dbDialectEnum("dialect").notNull().default("postgres"),

		// SQL DDL mentah yang diinput user
		rawSql: text("raw_sql").notNull(),

		// Hasil parse — disimpan agar tidak re-parse setiap kali diagram dibuka
		parsedData: jsonb("parsed_data").$type<ParseResult>().notNull(),

		// Posisi {x, y} tiap node di canvas — disimpan agar layout tidak reset saat buka ulang
		layoutData: jsonb("layout_data").$type<LayoutData>().default({}),

		isPinned: boolean("is_pinned").notNull().default(false),

		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
		deletedAt: timestamp("deleted_at"), // soft delete
	},
	(t) => [
		index("diagrams_user_id_idx").on(t.userId),
	],
);
