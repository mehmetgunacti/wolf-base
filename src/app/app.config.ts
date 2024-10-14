import { coreActions } from '@actions';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as service from 'services';
import * as store from 'store/store.config';
import { routes } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { NavOverlayComponent } from './nav-overlay/nav-overlay.component';
import { NavComponent } from './nav/nav.component';

export const appImports = [

	RouterOutlet,

	HeaderComponent,
	NavComponent,
	NavOverlayComponent

];

const appInitializerFactory = (store: Store) => {

	return () => {

		// load configuration
		store.dispatch(coreActions.loadAll());

	};

};

const appServices = [

	{ provide: service.LOCAL_REPOSITORY_SERVICE, useClass: service.DexieLocalRepositoryServiceImpl },
	{ provide: service.REMOTE_REPOSITORY_SERVICE, useClass: service.FirestoreRemoteRepositoryServiceImpl, deps: [ Store, HttpClient ] },
	{ provide: service.SYNC_SERVICE, useClass: service.SyncServiceImpl, deps: [ service.LOCAL_REPOSITORY_SERVICE, service.REMOTE_REPOSITORY_SERVICE ] },
	{ provide: service.BOOKMARK_SYNC_SERVICE, useClass: service.BookmarkSyncServiceImpl, deps: [ service.LOCAL_REPOSITORY_SERVICE, service.REMOTE_REPOSITORY_SERVICE ] },

];

export const appConfig: ApplicationConfig = {

	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000' }),
		provideStore(store.reducerList, { metaReducers: store.metaReducers }),
		provideEffects(store.effectList),
		provideStoreDevtools(),
		...appServices
	]

};
