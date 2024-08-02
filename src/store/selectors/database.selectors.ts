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

		sum += report.projects.entities.size ?? 0;
		sum += report.projects.syncData.size ?? 0;
		sum += report.projects.remoteData.size ?? 0;
		sum += report.projects.trash.size ?? 0;

		sum += report.quizEntries.entities.size ?? 0;
		sum += report.quizEntries.syncData.size ?? 0;
		sum += report.quizEntries.remoteData.size ?? 0;
		sum += report.quizEntries.trash.size ?? 0;

		sum += report.quotes.entities.size ?? 0;
		sum += report.quotes.syncData.size ?? 0;
		sum += report.quotes.remoteData.size ?? 0;
		sum += report.quotes.trash.size ?? 0;

		sum += report.tasks.entities.size ?? 0;
		sum += report.tasks.syncData.size ?? 0;
		sum += report.tasks.remoteData.size ?? 0;
		sum += report.tasks.trash.size ?? 0;

		sum += report.words.entities.size ?? 0;
		sum += report.words.syncData.size ?? 0;
		sum += report.words.remoteData.size ?? 0;
		sum += report.words.trash.size ?? 0;

		sum += report.logs.size ?? 0;

		return sum;

	}

);
