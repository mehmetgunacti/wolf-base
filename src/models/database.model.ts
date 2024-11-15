import { GlyphName } from '@constants/glyphs.constant';

export interface DexieConfiguration {

	dbName: string;
	version: number;
	tables: Record<string, string>;

}

export interface ReportRow {

	label: string;
	table: string,
	count: number;
	size: number;

}

export interface ModuleReport {

	name: string,
	glyph: GlyphName,
	reports: ReportRow[];

}
