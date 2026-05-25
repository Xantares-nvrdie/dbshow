import { pgTable, text, integer, timestamp, jsonb, index, unique } from "drizzle-orm/pg-core";
import { diagrams } from "./diagrams";
import type { ParseResult, LayoutData } from "./types";

// ─── Table ────────────────────────────────────────────────────────────────────

export const diagramSnapshots = pgTable(
	"diagram_snapshots",
	{
		id: text("id")
			.primaryKey()
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),

		diagramId: text("diagram_id")
			.notNull()
			.references(() => diagrams.id, { onDelete: "cascade" }),

		version: integer("version").notNull(),

		// Label opsional dari user, misal "Tambah tabel orders"
		label: text("label"),

		// SQL DDL pada saat snapshot dibuat
		rawSql: text("raw_sql").notNull(),

		// Hasil parse pada saat snapshot dibuat
		parsedData: jsonb("parsed_data").$type<ParseResult>().notNull(),

		// Posisi node pada saat snapshot dibuat
		layoutData: jsonb("layout_data").$type<LayoutData>().default({}),

		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(t) => [
		index("snapshots_diagram_id_idx").on(t.diagramId),
		unique("snapshots_diagram_version_uq").on(t.diagramId, t.version),
	],
);
