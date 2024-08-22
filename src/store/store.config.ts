import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import { BookmarkEntityCreateEffects } from './effects/bookmark-effects/bookmark-entity-create.effects';
import { BookmarkEntityMoveToTrashEffects } from './effects/bookmark-effects/bookmark-entity-move-to-trash.effects';
import { BookmarkEntityUpdateEffects } from './effects/bookmark-effects/bookmark-entity-update.effects';
import { BookmarkLoadEffects } from './effects/bookmark-effects/bookmark-load.effects';
import { BookmarkSyncClicksEffects } from './effects/bookmark-effects/bookmark-sync-clicks.effects';
import { BookmarkSyncDeletedDeletedEffects } from './effects/bookmark-effects/bookmark-sync-deleted-deleted.effects';
import { BookmarkSyncLocalDeletedEffects } from './effects/bookmark-effects/bookmark-sync-local-deleted.effects';
import { BookmarkSyncLocalNewEffects } from './effects/bookmark-effects/bookmark-sync-local-new.effects';
import { BookmarkSyncLocalUpdatedEffects } from './effects/bookmark-effects/bookmark-sync-local-updated.effects';
import { BookmarkSyncRemoteDeletedEffects } from './effects/bookmark-effects/bookmark-sync-remote-deleted.effects';
import { BookmarkSyncRemoteNewEffects } from './effects/bookmark-effects/bookmark-sync-remote-new.effects';
import { BookmarkSyncRemoteUpdatedEffects } from './effects/bookmark-effects/bookmark-sync-remote-updated.effects';
import { BookmarkSyncEffects } from './effects/bookmark-effects/bookmark-sync.effects';
import { BookmarkUIEffects } from './effects/bookmark-effects/bookmark-ui.effects';
import { CoreLoadEffects } from './effects/core-load.effects';
import { CoreNavigationEffects } from './effects/core-navigation.effects';
import { CoreNotificationEffects } from './effects/core-notification.effects';
import { CoreSidebarEffects } from './effects/core-sidebar.effects';
import { CoreThemeEffects } from './effects/core-theme.effects';
import { CoreUIEffects } from './effects/core-ui.effects';
import { DatabaseEffects } from './effects/database.effects';
import { EntityCreateEffects } from './effects/entity-effects/entity-create.effects';
import { EntityLoadEffects } from './effects/entity-effects/entity-load.effects';
import { LogsEffects } from './effects/logs.effects';
import { NoteContentEntityCreateEffects } from './effects/note-content-effects/note-content-entity-create.effects';
import { NoteContentEntityMoveToTrashEffects } from './effects/note-content-effects/note-content-entity-move-to-trash.effects';
import { NoteContentEntityUpdateEffects } from './effects/note-content-effects/note-content-entity-update.effects';
import { NoteContentLoadEffects } from './effects/note-content-effects/note-content-load.effects';
import { NoteContentSyncDeletedDeletedEffects } from './effects/note-content-effects/note-content-sync-deleted-deleted.effects';
import { NoteContentSyncLocalDeletedEffects } from './effects/note-content-effects/note-content-sync-local-deleted.effects';
import { NoteContentSyncLocalNewEffects } from './effects/note-content-effects/note-content-sync-local-new.effects';
import { NoteContentSyncLocalUpdatedEffects } from './effects/note-content-effects/note-content-sync-local-updated.effects';
import { NoteContentSyncRemoteDeletedEffects } from './effects/note-content-effects/note-content-sync-remote-deleted.effects';
import { NoteContentSyncRemoteNewEffects } from './effects/note-content-effects/note-content-sync-remote-new.effects';
import { NoteContentSyncRemoteUpdatedEffects } from './effects/note-content-effects/note-content-sync-remote-updated.effects';
import { NoteContentSyncEffects } from './effects/note-content-effects/note-content-sync.effects';
import { NoteEntityMoveToTrashEffects } from './effects/note-effects/note-entity-move-to-trash.effects';
import { NoteEntityUpdateEffects } from './effects/note-effects/note-entity-update.effects';
import { NoteSyncDeletedDeletedEffects } from './effects/note-effects/note-sync-deleted-deleted.effects';
import { NoteSyncLocalDeletedEffects } from './effects/note-effects/note-sync-local-deleted.effects';
import { NoteSyncLocalNewEffects } from './effects/note-effects/note-sync-local-new.effects';
import { NoteSyncLocalUpdatedEffects } from './effects/note-effects/note-sync-local-updated.effects';
import { NoteSyncRemoteDeletedEffects } from './effects/note-effects/note-sync-remote-deleted.effects';
import { NoteSyncRemoteNewEffects } from './effects/note-effects/note-sync-remote-new.effects';
import { NoteSyncRemoteUpdatedEffects } from './effects/note-effects/note-sync-remote-updated.effects';
import { NoteSyncEffects } from './effects/note-effects/note-sync.effects';
import { NoteUIEffects } from './effects/note-effects/note-ui.effects';
import { ProjectEntityCreateEffects } from './effects/project-effects/project-entity-create.effects';
import { ProjectEntityMoveToTrashEffects } from './effects/project-effects/project-entity-move-to-trash.effects';
import { ProjectEntityUpdateEffects } from './effects/project-effects/project-entity-update.effects';
import { ProjectLoadEffects } from './effects/project-effects/project-load.effects';
import { ProjectSyncDeletedDeletedEffects } from './effects/project-effects/project-sync-deleted-deleted.effects';
import { ProjectSyncLocalDeletedEffects } from './effects/project-effects/project-sync-local-deleted.effects';
import { ProjectSyncLocalNewEffects } from './effects/project-effects/project-sync-local-new.effects';
import { ProjectSyncLocalUpdatedEffects } from './effects/project-effects/project-sync-local-updated.effects';
import { ProjectSyncRemoteDeletedEffects } from './effects/project-effects/project-sync-remote-deleted.effects';
import { ProjectSyncRemoteNewEffects } from './effects/project-effects/project-sync-remote-new.effects';
import { ProjectSyncRemoteUpdatedEffects } from './effects/project-effects/project-sync-remote-updated.effects';
import { ProjectSyncEffects } from './effects/project-effects/project-sync.effects';
import { ProjectUIEffects } from './effects/project-effects/project-ui.effects';
import { TaskEditEffects } from './effects/project-task-effects/project-task-edit-dialog.effects';
import { TaskEntityCreateEffects } from './effects/project-task-effects/project-task-entity-create.effects';
import { TaskEntityMoveToTrashEffects } from './effects/project-task-effects/project-task-entity-move-to-trash.effects';
import { TaskEntityUpdateEffects } from './effects/project-task-effects/project-task-entity-update.effects';
import { TaskLoadEffects } from './effects/project-task-effects/project-task-load.effects';
import { TaskSyncDeletedDeletedEffects } from './effects/project-task-effects/project-task-sync-deleted-deleted.effects';
import { TaskSyncLocalDeletedEffects } from './effects/project-task-effects/project-task-sync-local-deleted.effects';
import { TaskSyncLocalNewEffects } from './effects/project-task-effects/project-task-sync-local-new.effects';
import { TaskSyncLocalUpdatedEffects } from './effects/project-task-effects/project-task-sync-local-updated.effects';
import { TaskSyncRemoteDeletedEffects } from './effects/project-task-effects/project-task-sync-remote-deleted.effects';
import { TaskSyncRemoteNewEffects } from './effects/project-task-effects/project-task-sync-remote-new.effects';
import { TaskSyncRemoteUpdatedEffects } from './effects/project-task-effects/project-task-sync-remote-updated.effects';
import { TaskSyncEffects } from './effects/project-task-effects/project-task-sync.effects';
import { TaskUIEffects } from './effects/project-task-effects/project-task-ui.effects';
import { QuizEntryEntityCreateEffects } from './effects/quiz-entry-effects/quiz-entry-entity-create.effects';
import { QuizEntryEntityMoveToTrashEffects } from './effects/quiz-entry-effects/quiz-entry-entity-move-to-trash.effects';
import { QuizEntryEntityUpdateEffects } from './effects/quiz-entry-effects/quiz-entry-entity-update.effects';
import { QuizEntryLoadEffects } from './effects/quiz-entry-effects/quiz-entry-load.effects';
import { QuizEntrySyncDeletedDeletedEffects } from './effects/quiz-entry-effects/quiz-entry-sync-deleted-deleted.effects';
import { QuizEntrySyncLocalDeletedEffects } from './effects/quiz-entry-effects/quiz-entry-sync-local-deleted.effects';
import { QuizEntrySyncLocalNewEffects } from './effects/quiz-entry-effects/quiz-entry-sync-local-new.effects';
import { QuizEntrySyncLocalUpdatedEffects } from './effects/quiz-entry-effects/quiz-entry-sync-local-updated.effects';
import { QuizEntrySyncRemoteDeletedEffects } from './effects/quiz-entry-effects/quiz-entry-sync-remote-deleted.effects';
import { QuizEntrySyncRemoteNewEffects } from './effects/quiz-entry-effects/quiz-entry-sync-remote-new.effects';
import { QuizEntrySyncRemoteUpdatedEffects } from './effects/quiz-entry-effects/quiz-entry-sync-remote-updated.effects';
import { QuizEntrySyncEffects } from './effects/quiz-entry-effects/quiz-entry-sync.effects';
import { QuizUIEffects } from './effects/quiz-entry-effects/quiz-ui.effects';
import { QuoteEntityCreateEffects } from './effects/quote-effects/quote-entity-create.effects';
import { QuoteEntityMoveToTrashEffects } from './effects/quote-effects/quote-entity-move-to-trash.effects';
import { QuoteEntityUpdateEffects } from './effects/quote-effects/quote-entity-update.effects';
import { QuoteLoadEffects } from './effects/quote-effects/quote-load.effects';
import { QuoteSyncDeletedDeletedEffects } from './effects/quote-effects/quote-sync-deleted-deleted.effects';
import { QuoteSyncLocalDeletedEffects } from './effects/quote-effects/quote-sync-local-deleted.effects';
import { QuoteSyncLocalNewEffects } from './effects/quote-effects/quote-sync-local-new.effects';
import { QuoteSyncLocalUpdatedEffects } from './effects/quote-effects/quote-sync-local-updated.effects';
import { QuoteSyncRemoteDeletedEffects } from './effects/quote-effects/quote-sync-remote-deleted.effects';
import { QuoteSyncRemoteNewEffects } from './effects/quote-effects/quote-sync-remote-new.effects';
import { QuoteSyncRemoteUpdatedEffects } from './effects/quote-effects/quote-sync-remote-updated.effects';
import { QuoteSyncEffects } from './effects/quote-effects/quote-sync.effects';
import { QuoteViewerEffects } from './effects/quote-effects/quote-viewer.effects';
import { SettingsEffects } from './effects/settings.effects';
import { WordEntityCreateEffects } from './effects/word-effects/word-entity-create.effects';
import { WordEntityMoveToTrashEffects } from './effects/word-effects/word-entity-move-to-trash.effects';
import { WordEntityUpdateEffects } from './effects/word-effects/word-entity-update.effects';
import { WordLoadEffects } from './effects/word-effects/word-load.effects';
import { WordSyncDeletedDeletedEffects } from './effects/word-effects/word-sync-deleted-deleted.effects';
import { WordSyncLocalDeletedEffects } from './effects/word-effects/word-sync-local-deleted.effects';
import { WordSyncLocalNewEffects } from './effects/word-effects/word-sync-local-new.effects';
import { WordSyncLocalUpdatedEffects } from './effects/word-effects/word-sync-local-updated.effects';
import { WordSyncRemoteDeletedEffects } from './effects/word-effects/word-sync-remote-deleted.effects';
import { WordSyncRemoteNewEffects } from './effects/word-effects/word-sync-remote-new.effects';
import { WordSyncRemoteUpdatedEffects } from './effects/word-effects/word-sync-remote-updated.effects';
import { WordSyncEffects } from './effects/word-effects/word-sync.effects';
import { WordUIEffects } from './effects/word-effects/word-ui.effects';
import { bookmarkReducer } from './reducers/bookmark-reducers/bookmark.reducer';
import { cloudReducer } from './reducers/cloud.reducer';
import { coreReducer } from './reducers/core.reducer';
import { databaseReducer } from './reducers/database.reducer';
import { entitiesReducer } from './reducers/entity-reducers/entities.reducer';
import { logsReducer } from './reducers/logs.reducer';
import { noteContentReducer } from './reducers/note-content-reducers/note-content.reducer';
import { noteReducer } from './reducers/note-reducers/note.reducer';
import { projectReducer } from './reducers/project-reducers/project.reducer';
import { taskReducer } from './reducers/project-task-reducers/task.reducer';
import { quizEntryReducer } from './reducers/quiz-entry-reducers/quiz-entry.reducer';
import { quoteReducer } from './reducers/quote-reducers/quote.reducer';
import { wordReducer } from './reducers/word-reducers/word.reducer';
import { AppState } from './states/app.state';

function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {

	return function (state: AppState | undefined, action: Action) {

		// code here
		return reducer(state, action);

	};

}

export const metaReducers: MetaReducer<AppState>[] = [

	// clearState

];

export const effects = [

	// Core
	CoreLoadEffects,
	CoreNavigationEffects,
	CoreNotificationEffects,
	CoreUIEffects,
	CoreThemeEffects,
	CoreSidebarEffects,

	// Entity
	EntityCreateEffects,
	EntityLoadEffects,

	// Bookmarks
	BookmarkSyncEffects,

	BookmarkSyncLocalNewEffects,
	BookmarkSyncLocalUpdatedEffects,
	BookmarkSyncLocalDeletedEffects,

	BookmarkSyncRemoteNewEffects,
	BookmarkSyncRemoteUpdatedEffects,
	BookmarkSyncRemoteDeletedEffects,

	BookmarkSyncDeletedDeletedEffects,

	BookmarkSyncClicksEffects,

	BookmarkEntityCreateEffects,
	BookmarkEntityUpdateEffects,
	BookmarkEntityMoveToTrashEffects,

	BookmarkLoadEffects,
	BookmarkUIEffects,

	// Notes
	NoteSyncEffects,

	NoteSyncLocalNewEffects,
	NoteSyncLocalUpdatedEffects,
	NoteSyncLocalDeletedEffects,

	NoteSyncRemoteNewEffects,
	NoteSyncRemoteUpdatedEffects,
	NoteSyncRemoteDeletedEffects,

	NoteSyncDeletedDeletedEffects,

	// NoteEntityCreateEffects,
	NoteEntityUpdateEffects,
	NoteEntityMoveToTrashEffects,

	// NoteLoadEffects,
	NoteUIEffects,

	// Notes Content
	NoteContentEntityCreateEffects,
	NoteContentLoadEffects,

	NoteContentSyncEffects,

	NoteContentEntityMoveToTrashEffects,
	NoteContentEntityUpdateEffects,
	NoteContentSyncDeletedDeletedEffects,
	NoteContentSyncLocalDeletedEffects,
	NoteContentSyncLocalNewEffects,
	NoteContentSyncLocalUpdatedEffects,
	NoteContentSyncRemoteDeletedEffects,
	NoteContentSyncRemoteNewEffects,
	NoteContentSyncRemoteUpdatedEffects,

	// Projects
	ProjectSyncEffects,

	ProjectSyncLocalNewEffects,
	ProjectSyncLocalUpdatedEffects,
	ProjectSyncLocalDeletedEffects,

	ProjectSyncRemoteNewEffects,
	ProjectSyncRemoteUpdatedEffects,
	ProjectSyncRemoteDeletedEffects,

	ProjectSyncDeletedDeletedEffects,

	ProjectEntityCreateEffects,
	ProjectEntityUpdateEffects,
	ProjectEntityMoveToTrashEffects,

	ProjectLoadEffects,
	ProjectUIEffects,

	// Project Tasks
	TaskSyncEffects,

	TaskSyncLocalNewEffects,
	TaskSyncLocalUpdatedEffects,
	TaskSyncLocalDeletedEffects,

	TaskSyncRemoteNewEffects,
	TaskSyncRemoteUpdatedEffects,
	TaskSyncRemoteDeletedEffects,

	TaskSyncDeletedDeletedEffects,

	TaskEntityCreateEffects,
	TaskEntityUpdateEffects,
	TaskEntityMoveToTrashEffects,

	TaskLoadEffects,
	TaskEditEffects,

	TaskUIEffects,

	// Words
	WordSyncEffects,

	WordSyncLocalNewEffects,
	WordSyncLocalUpdatedEffects,
	WordSyncLocalDeletedEffects,

	WordSyncRemoteNewEffects,
	WordSyncRemoteUpdatedEffects,
	WordSyncRemoteDeletedEffects,

	WordSyncDeletedDeletedEffects,

	WordEntityCreateEffects,
	WordEntityUpdateEffects,
	WordEntityMoveToTrashEffects,

	WordLoadEffects,
	WordUIEffects,

	// Quiz
	QuizEntrySyncEffects,

	QuizEntrySyncLocalNewEffects,
	QuizEntrySyncLocalUpdatedEffects,
	QuizEntrySyncLocalDeletedEffects,

	QuizEntrySyncRemoteNewEffects,
	QuizEntrySyncRemoteUpdatedEffects,
	QuizEntrySyncRemoteDeletedEffects,

	QuizEntrySyncDeletedDeletedEffects,

	QuizEntryEntityCreateEffects,
	QuizEntryEntityUpdateEffects,
	QuizEntryEntityMoveToTrashEffects,

	QuizEntryLoadEffects,
	QuizUIEffects,

	// Quotes
	QuoteSyncEffects,

	QuoteSyncLocalNewEffects,
	QuoteSyncLocalUpdatedEffects,
	QuoteSyncLocalDeletedEffects,

	QuoteSyncRemoteNewEffects,
	QuoteSyncRemoteUpdatedEffects,
	QuoteSyncRemoteDeletedEffects,

	QuoteSyncDeletedDeletedEffects,

	QuoteEntityCreateEffects,
	QuoteEntityUpdateEffects,
	QuoteEntityMoveToTrashEffects,

	QuoteLoadEffects,

	QuoteViewerEffects,

	// Database
	DatabaseEffects,

	// Settings
	SettingsEffects,

	// Logs
	LogsEffects

];

export const reducers: ActionReducerMap<AppState> = {

	entities: entitiesReducer,
	bookmark: combineReducers(bookmarkReducer),
	core: combineReducers(coreReducer),
	cloud: cloudReducer,
	database: databaseReducer,
	logs: combineReducers(logsReducer),
	note: combineReducers(noteReducer),
	noteContent: combineReducers(noteContentReducer),
	project: combineReducers(projectReducer),
	quizEntry: combineReducers(quizEntryReducer),
	quote: combineReducers(quoteReducer),
	task: combineReducers(taskReducer),
	word: combineReducers(wordReducer)

};
