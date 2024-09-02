import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CloudModuleState } from "store/states/cloud.state";
import { selCloudTasks as selBookmark_CloudTasks } from '../bookmark-selectors/bookmark-sync.selectors';
import { selCloudTasks as selNoteContent_CloudTasks } from '../note-content-selectors/note-content-sync.selectors';
import { selCloudTasks as selNote_CloudTasks } from '../note-selectors/note-sync.selectors';
import { selCloudTasks as selProject_CloudTasks } from '../project-selectors/project-sync.selectors';
import { selCloudTasks as selTask_CloudTasks } from '../project-task-selectors/task-sync.selectors';
import { selCloudTasks as selQuizEntry_CloudTasks } from '../quiz-entry-selectors/quiz-entry-sync.selectors';
import { selCloudTasks as selQuote_CloudTasks } from '../quote-selectors/quote-sync.selectors';
import { selCloudTasks as selWord_CloudTasks } from '../word-selectors/word-sync.selectors';

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
