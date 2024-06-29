import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DatabaseModuleState } from 'store/states/database.state';

const selDatabaseModuleState = createFeatureSelector<DatabaseModuleState>('database');

export const selDatabase_Report = createSelector(

	selDatabaseModuleState,
	state => state.report

);

export const selDatabase_TotalSize = createSelector(

	selDatabase_Report,
	report => {

		let sum = 0;
		sum += report.bookmarks.entities.size ?? 0;
		sum += report.bookmarks.syncData.size ?? 0;
		sum += report.bookmarks.remoteData.size ?? 0;
		sum += report.bookmarks.trash.size ?? 0;
		sum += report.bookmarks.clicks.size ?? 0;

		sum += report.notes.entities.size ?? 0;
		sum += report.notes.syncData.size ?? 0;
		sum += report.notes.remoteData.size ?? 0;
		sum += report.notes.trash.size ?? 0;

		sum += report.notesContent.entities.size ?? 0;
		sum += report.notesContent.syncData.size ?? 0;
		sum += report.notesContent.remoteData.size ?? 0;
		sum += report.notesContent.trash.size ?? 0;

		sum += report.words.entities.size ?? 0;
		sum += report.words.syncData.size ?? 0;
		sum += report.words.remoteData.size ?? 0;
		sum += report.words.trash.size ?? 0;

		sum += report.logs.size ?? 0;

		return sum;

	}

);
