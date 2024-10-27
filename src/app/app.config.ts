import { coreActions } from '@actions';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet, withViewTransitions } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as service from '@services';
import { indexedDbConfiguration } from 'services/indexeddb';
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

	{ provide: APP_INITIALIZER, useFactory: appInitializerFactory, multi: true, deps: [ Store ] },
	{ provide: ErrorHandler, useClass: service.CustomErrorHandler },
	{ provide: service.LOCAL_REPOSITORY_SERVICE, useClass: service.IndexedDbLocalRepositoryServiceImpl },
	{ provide: service.REMOTE_REPOSITORY_SERVICE, useClass: service.FirestoreRemoteRepositoryServiceImpl, deps: [ Store, HttpClient ] },
	{ provide: service.SYNC_SERVICE, useClass: service.SyncServiceImpl, deps: [ service.LOCAL_REPOSITORY_SERVICE, service.REMOTE_REPOSITORY_SERVICE ] },
	{ provide: service.BOOKMARK_SYNC_SERVICE, useClass: service.BookmarkSyncServiceImpl, deps: [ service.LOCAL_REPOSITORY_SERVICE, service.REMOTE_REPOSITORY_SERVICE ] },
	{ provide: service.DATABASE_CONFIG, useValue: indexedDbConfiguration }

];

export const appConfig: ApplicationConfig = {

	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withViewTransitions()),
		provideHttpClient(),
		provideAnimations(),
		provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000' }),
		provideStore(store.reducerList, { metaReducers: store.metaReducers }),
		provideEffects(store.effectList),
		provideStoreDevtools(),
		...appServices
	]

};
