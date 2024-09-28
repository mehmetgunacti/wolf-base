import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, InjectionToken, Provider } from '@angular/core';
import { Routes } from '@angular/router';
import { AppEntityType, LocalRepositoryService, RemoteRepositoryService } from '@lib';
import { Store } from '@ngrx/store';
import { BookmarkSyncService, SyncService } from 'lib/services/sync-service.interface';
import { CustomErrorHandler, DexieLocalRepositoryServiceImpl, FirestoreRemoteRepositoryServiceImpl } from 'services';
import { AnimationAwareDialog } from 'services/animation-aware-dialog.service';
import { BookmarkSyncServiceImpl } from 'services/bookmark-sync.service';
import { SyncServiceImpl } from 'services/sync.service';
import { bookmarkActions, coreActions, entityActions } from 'store/actions';

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

		// load configuration
		store.dispatch(coreActions.loadAll());

		// load entities
		store.dispatch(entityActions.loadAll({

			filter: [

				{ entityType: AppEntityType.bookmark, loadEntities: true, loadSyncData: true, loadRemoteMetadata: true },
				{ entityType: AppEntityType.note, loadEntities: true, loadSyncData: true, loadRemoteMetadata: true },
				{ entityType: AppEntityType.noteContent, loadEntities: false, loadSyncData: true, loadRemoteMetadata: true },
				{ entityType: AppEntityType.word, loadEntities: true, loadSyncData: true, loadRemoteMetadata: true },
				{ entityType: AppEntityType.quote, loadEntities: true, loadSyncData: true, loadRemoteMetadata: true },
				{ entityType: AppEntityType.quizEntry, loadEntities: true, loadSyncData: true, loadRemoteMetadata: true },
				{ entityType: AppEntityType.project, loadEntities: true, loadSyncData: true, loadRemoteMetadata: true },
				{ entityType: AppEntityType.task, loadEntities: true, loadSyncData: true, loadRemoteMetadata: true },

			]

		}));

		// load clicks
		store.dispatch(bookmarkActions.loadAllClicks());

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
