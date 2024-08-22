import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, InjectionToken, Provider } from '@angular/core';
import { Routes } from '@angular/router';
import { AppEntityType, LocalRepositoryService, RemoteRepositoryService } from '@lib';
import { Store } from '@ngrx/store';
import { BookmarkSyncService, SyncService } from 'lib/services/sync-service.interface';
import { CustomErrorHandler, DexieLocalRepositoryServiceImpl, FirestoreRemoteRepositoryServiceImpl } from 'services';
import { BookmarkSyncServiceImpl } from 'services/bookmark-sync.service';
import { SyncServiceImpl } from 'services/sync.service';
import * as coreActions from 'store/actions/core.actions';
import * as bmActions from 'store/actions/bookmark.actions';
import * as noteContentActions from 'store/actions/note-content.actions';
import * as noteActions from 'store/actions/note.actions';
import * as wordActions from 'store/actions/word.actions';
import * as projectActions from 'store/actions/project.actions';
import * as taskActions from 'store/actions/project-task.actions';
import * as quoteActions from 'store/actions/quote.actions';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';
import * as entityActions from 'store/actions/entity.actions';
import { AnimationAwareDialog } from 'services/animation-aware-dialog.service';
import { Dialog } from '@angular/cdk/dialog';

export const routes: Routes = [

	{

		path: '',
		loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule)

	},
	{

		path: 'bookmarks',
		loadChildren: () => import('../modules/bookmark/bookmark.module').then(m => m.BookmarkModule)

	},
	{

		path: 'notes',
		loadChildren: () => import('../modules/note/note.module').then(m => m.NoteModule)

	},
	{

		path: 'words',
		loadChildren: () => import('../modules/word/word.module').then(m => m.WordModule)

	},
	{

		path: 'projects',
		loadChildren: () => import('../modules/project/project.module').then(m => m.ProjectModule)

	},
	{

		path: 'cloud',
		loadChildren: () => import('../modules/cloud/cloud.module').then(m => m.CloudModule)

	},
	{

		path: 'logs',
		loadChildren: () => import('../modules/logs/logs.module').then(m => m.LogsModule)

	},
	{

		path: 'database',
		loadChildren: () => import('../modules/database/database.module').then(m => m.DatabaseModule)

	},
	{

		path: 'settings',
		loadChildren: () => import('../modules/settings/settings.module').then(m => m.SettingsModule)

	}

];

const appInitializerFactory = (store: Store) => {

	return () => {

		store.dispatch(coreActions.loadAll());
		store.dispatch(bmActions.loadAll());
		// store.dispatch(noteActions.loadAll());
		store.dispatch(entityActions.loadAll({ entityType: AppEntityType.note }));
		store.dispatch(noteContentActions.loadAll());
		// store.dispatch(wordActions.loadAll());
		store.dispatch(entityActions.loadAll({ entityType: AppEntityType.word }));
		store.dispatch(quoteActions.loadAll());
		store.dispatch(quizEntryActions.loadAll());
		//store.dispatch(projectActions.loadAll());
		store.dispatch(entityActions.loadAll({ entityType: AppEntityType.project }));
		// store.dispatch(taskActions.loadAll());
		store.dispatch(entityActions.loadAll({ entityType: AppEntityType.task }));

	};

}

export const LOCAL_REPOSITORY_SERVICE = new InjectionToken<LocalRepositoryService>('LocalRepositoryService');
export const REMOTE_REPOSITORY_SERVICE = new InjectionToken<RemoteRepositoryService>('RemoteRepositoryService');
export const SYNC_SERVICE = new InjectionToken<SyncService>('SyncService');
export const BOOKMARK_SYNC_SERVICE = new InjectionToken<BookmarkSyncService>('BookmarkSyncService');

export const providers: Provider[] = [
	{

		// Angular initializes
		provide: APP_INITIALIZER,
		useFactory: appInitializerFactory,
		multi: true,
		deps: [Store]

	},
	{

		// catch errors globally
		provide: ErrorHandler,
		useClass: CustomErrorHandler

	},
	{ provide: LOCAL_REPOSITORY_SERVICE, useClass: DexieLocalRepositoryServiceImpl },
	{ provide: REMOTE_REPOSITORY_SERVICE, useClass: FirestoreRemoteRepositoryServiceImpl, deps: [Store, HttpClient] },
	{ provide: SYNC_SERVICE, useClass: SyncServiceImpl, deps: [LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE] },
	{ provide: BOOKMARK_SYNC_SERVICE, useClass: BookmarkSyncServiceImpl, deps: [LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE] },
	{ provide: Dialog, useClass: AnimationAwareDialog }

];
