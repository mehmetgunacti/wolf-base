export interface DexieConfiguration {

	dbName: string;
	version: number;
	tables: Record<string, string>;

}

export interface EntityReportRow {

	count: number | null;
	size: number | null;

}

export interface EntityReport {

	entities: EntityReportRow;
	syncData: EntityReportRow;
	remoteData: EntityReportRow;
	trash: EntityReportRow;

};

const emptyRow: EntityReportRow = {

	count: null,
	size: null

}

const emptyEntityReport: EntityReport = {

	entities: emptyRow,
	syncData: emptyRow,
	remoteData: emptyRow,
	trash: emptyRow

}

export interface DatabaseReport {

	bookmarks: EntityReport & { clicks: EntityReportRow; };
	notes: EntityReport;
	notesContent: EntityReport;
	projects: EntityReport;
	quizEntries: EntityReport;
	quotes: EntityReport;
	tasks: EntityReport;
	words: EntityReport;
	logs: EntityReportRow;

}

export const emptyDatabaseReport: DatabaseReport = {

	bookmarks: { ...emptyEntityReport, clicks: emptyRow },
	notes: emptyEntityReport,
	notesContent: emptyEntityReport,
	projects: emptyEntityReport,
	quizEntries: emptyEntityReport,
	quotes: emptyEntityReport,
	tasks: emptyEntityReport,
	words: emptyEntityReport,
	logs: emptyRow

}
