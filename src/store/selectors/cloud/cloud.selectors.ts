import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CloudModuleState } from "store/states/cloud.state";
import { selBookmark_CloudTasks } from '../sync/sync-bookmark.selectors';
import { selNoteContent_CloudTasks } from '../sync/sync-note-content.selectors';
import { selNote_CloudTasks } from '../sync/sync-note.selectors';
import { selProject_CloudTasks } from '../sync/sync-project.selectors';
import { selQuizEntry_CloudTasks } from '../sync/sync-quiz-entry.selectors';
import { selQuote_CloudTasks } from '../sync/sync-quote.selectors';
import { selTask_CloudTasks } from '../sync/sync-task.selectors';
import { selWord_CloudTasks } from '../sync/sync-word.selectors';

export const selCloudModuleState = createFeatureSelector<CloudModuleState>('cloud');

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
