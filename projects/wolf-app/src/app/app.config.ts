import { HttpClient } from '@angular/common/http';
import { ErrorHandler, InjectionToken, Provider } from '@angular/core';
import { Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageService, RemoteStorageService } from 'lib';
import { SyncService } from 'lib/services/sync-service.interface';
import { CustomErrorHandler, DexieLocalStorageServiceImpl, FirestoreRemoteStorageServiceImpl } from 'services';
import { SyncServiceImpl } from 'services/sync.service';

export const routes: Routes = [

	// {

	// 	path: '',
	// 	loadChildren: () => import('../modules/core/core.module').then(m => m.CoreModule)

	// }

];

// const appInitializerFactory = (store: Store) => {

// 	return () => {

// set theme
// const lsTheme = localStorage.getItem('theme');
// const newTheme = !!lsTheme ? resolveTheme(lsTheme) : DEFAULT_THEME;
// store.dispatch(actions.themeSet({ newTheme }));

// 	};

// }

export const LOCAL_STORAGE_SERVICE = new InjectionToken<LocalStorageService>('LocalStorageService');
export const REMOTE_STORAGE_SERVICE = new InjectionToken<RemoteStorageService>('RemoteStorageService');
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
	{ provide: LOCAL_STORAGE_SERVICE, useClass: DexieLocalStorageServiceImpl },
	{ provide: REMOTE_STORAGE_SERVICE, useClass: FirestoreRemoteStorageServiceImpl, deps: [Store, HttpClient] },
	{ provide: SYNC_SERVICE, useClass: SyncServiceImpl, deps: [LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE] },

];