// ─── Parsed Data Types ────────────────────────────────────────────────────────
// Hasil parse SQL DDL — struktur tabel, kolom, dan relasi

export interface ParsedColumn {
	name: string;
	type: string;
	nullable?: boolean;
	primaryKey?: boolean;
	unique?: boolean;
	default?: string;
	references?: {
		table: string;
		column: string;
	};
}

export interface ParsedTable {
	name: string;
	columns: ParsedColumn[];
}

export interface ParsedRelation {
	fromTable: string;
	fromColumn: string;
	toTable: string;
	toColumn: string;
	type?: "one-to-one" | "one-to-many" | "many-to-many";
}

export interface ParseResult {
	tables: ParsedTable[];
	relations: ParsedRelation[];
}

// ─── Layout Data Types ───────────────────────────────────────────────────────
// Posisi node di canvas — disimpan agar layout tidak reset saat buka ulang

export interface LayoutData {
	// key = nama tabel, value = posisi node di canvas
	nodes?: Record<string, { x: number; y: number; collapsed?: boolean }>;
	zoom?: number;
	panX?: number;
	panY?: number;
}
