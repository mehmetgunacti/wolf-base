import { HttpClient } from '@angular/common/http';
import { ErrorHandler, InjectionToken, Provider } from '@angular/core';
import { Routes } from '@angular/router';
import { LocalRepositoryService, RemoteRepositoryService, WOverlayService } from '@lib';
import { Store } from '@ngrx/store';
import { SyncService } from 'lib/services/sync-service.interface';
import { CustomErrorHandler, DexieLocalRepositoryServiceImpl, FirestoreRemoteRepositoryServiceImpl } from 'services';
import { SyncServiceImpl } from 'services/sync.service';

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

		path: 'cloud',
		loadChildren: () => import('../modules/cloud/cloud.module').then(m => m.CloudModule)

	},
	{

		path: 'settings',
		loadChildren: () => import('../modules/settings/settings.module').then(m => m.SettingsModule)

	}

];

// const appInitializerFactory = (store: Store) => {

// 	return () => {

// set theme
// const lsTheme = localStorage.getItem('theme');
// const newTheme = !!lsTheme ? resolveTheme(lsTheme) : DEFAULT_THEME;
// store.dispatch(actions.themeSet({ newTheme }));

// 	};

// }

export const LOCAL_STORAGE_SERVICE = new InjectionToken<LocalRepositoryService>('LocalRepositoryService');
export const REMOTE_STORAGE_SERVICE = new InjectionToken<RemoteRepositoryService>('RemoteRepositoryService');
export const SYNC_SERVICE = new InjectionToken<SyncService>('SyncService');

export const providers: Provider[] = [

	// {

	// 	// Angular initializes
	// 	provide: APP_INITIALIZER,
	// 	useFactory: appInitializerFactory,
	// 	multi: true,
	// 	deps: [Store]

	// },
	{

		// catch errors globally
		provide: ErrorHandler,
		useClass: CustomErrorHandler

	},
	{ provide: LOCAL_STORAGE_SERVICE, useClass: DexieLocalRepositoryServiceImpl },
	{ provide: REMOTE_STORAGE_SERVICE, useClass: FirestoreRemoteRepositoryServiceImpl, deps: [Store, HttpClient] },
	{ provide: SYNC_SERVICE, useClass: SyncServiceImpl, deps: [LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE] },
	{ provide: WOverlayService }

];
