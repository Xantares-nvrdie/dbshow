import { relations } from "drizzle-orm";
import { user } from "./auth";
import { diagrams } from "./diagrams";
import { diagramSnapshots } from "./diagram-snapshots";

// ─── User Relations ──────────────────────────────────────────────────────────

export const userRelations = relations(user, ({ many }) => ({
	diagrams: many(diagrams),
}));

// ─── Diagram Relations ───────────────────────────────────────────────────────

export const diagramsRelations = relations(diagrams, ({ one, many }) => ({
	owner: one(user, {
		fields: [diagrams.userId],
		references: [user.id],
	}),
	snapshots: many(diagramSnapshots),
}));

// ─── Diagram Snapshot Relations ──────────────────────────────────────────────

export const diagramSnapshotsRelations = relations(diagramSnapshots, ({ one }) => ({
	diagram: one(diagrams, {
		fields: [diagramSnapshots.diagramId],
		references: [diagrams.id],
	}),
}));
