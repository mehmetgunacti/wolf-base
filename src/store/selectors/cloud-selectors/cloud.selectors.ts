import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CloudModuleState } from "store/states/cloud.state";
import { selBookmark_CloudTasks } from '../bookmark-selectors/bookmark-cloud.selectors';
import { selNote_CloudTasks } from '../note-selectors/note-cloud.selectors';
import { selNoteContent_CloudTasks } from '../note-content-selectors/note-content-cloud.selectors';
import { selWord_CloudTasks } from './cloud-word.selectors';
import { selQuote_CloudTasks } from '../quote-selectors/quote-cloud.selectors';
import { selQuizEntry_CloudTasks } from '../quiz-entry-selectors/quiz-entry-cloud.selectors';
import { selProject_CloudTasks } from '../project-selectors/project-cloud.selectors';
import { selTask_CloudTasks } from '../project-task-selectors/task-cloud.selectors';

export const selCloudModuleState = createFeatureSelector<CloudModuleState>('cloud');

export const selCloudSelectedConflict = createSelector(

	selCloudModuleState,
	state => state.selectedSyncData

);

export const selCloudSelectedItem = createSelector(

	selCloudModuleState,
	state => state.selectedEntity

);

export const selCloudSelectedTrashItem = createSelector(

	selCloudModuleState,
	state => state.selectedTrashEntity

);

export const selCloudSelectedRemoteData = createSelector(

	selCloudModuleState,
	state => state.selectedRemoteData

);

export const selCloudSelectedRemoteMetadata = createSelector(

	selCloudModuleState,
	state => state.selectedRemoteMetadata

);

export const selCloudAvailableTasks = createSelector(

	selBookmark_CloudTasks,
	selNote_CloudTasks,
	selNoteContent_CloudTasks,
	selWord_CloudTasks,
	selQuote_CloudTasks,
	selQuizEntry_CloudTasks,
	selProject_CloudTasks,
	selTask_CloudTasks,
	(bookmarks, notes, contents, words, quotes, quizEntries, projects, tasks) => [...bookmarks, ...notes, ...contents, ...words, ...quotes, ...quizEntries, ...projects, ...tasks]

);
