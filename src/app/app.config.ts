import { coreActions } from '@actions/core.actions';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { registerLocaleData } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { ApplicationConfig, ErrorHandler, inject, isDevMode, LOCALE_ID, provideAppInitializer, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet, withViewTransitions } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { ProgressComponent } from '@libComponents/progress/progress.component';
import { provideEffects } from '@ngrx/effects';
import { provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BookmarkSyncServiceImpl } from '@services/bookmark-sync.service';
import { CustomErrorHandler } from '@services/error.handler';
import { FirestoreRemoteRepositoryServiceImpl } from '@services/firestore/firestore.service';
import { IndexedDbLocalRepositoryServiceImpl } from '@services/indexeddb/local-repository.service';
import { indexedDbConfiguration } from '@services/indexeddb/wolfbase.database';
import { progressBarInterceptor } from '@services/interceptors/progress.interceptor';
import { LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE } from '@services/repository.service';
import { BOOKMARK_SYNC_SERVICE, DATABASE_CONFIG, SYNC_SERVICE, SyncServiceImpl } from '@services/sync.service';
import * as store from 'store/store.config';
import { HeaderComponent } from './header/header.component';
import { NavOverlayComponent } from './nav-overlay/nav-overlay.component';
import { NavComponent } from './nav/nav.component';
import { routes } from './routes/app.routes';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

export const appImports = [

	RouterOutlet,
	HeaderComponent,
	NavComponent,
	NavOverlayComponent,
	ProgressComponent,
	CdkScrollable,
	SplashScreenComponent

];

const appInitializer = () => {

	const store: Store = inject(Store);

	// load all data
	store.dispatch(coreActions.loadAll());

};

const appServices = [

	{ provide: ErrorHandler, useClass: CustomErrorHandler },
	{ provide: LOCAL_REPOSITORY_SERVICE, useClass: IndexedDbLocalRepositoryServiceImpl },
	{ provide: REMOTE_REPOSITORY_SERVICE, useClass: FirestoreRemoteRepositoryServiceImpl, deps: [ Store, HttpClient ] },
	{ provide: SYNC_SERVICE, useClass: SyncServiceImpl, deps: [ LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE ] },
	{ provide: BOOKMARK_SYNC_SERVICE, useClass: BookmarkSyncServiceImpl, deps: [ LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE ] },
	{ provide: DATABASE_CONFIG, useValue: indexedDbConfiguration }

];

// for e.g. DecimalPipe {{ myNumber | number:'1.0-0':'de-DE' }} to work:
// step 1: Register the locale data
// step 2: set LOCALE_ID in "providers" array
registerLocaleData(localeDe);

export const appConfig: ApplicationConfig = {

	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideRouter(routes, withViewTransitions()),
		provideHttpClient(withInterceptors([ progressBarInterceptor ]),),
		provideAnimations(),
		provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000' }),
		provideStore(store.reducerList, { metaReducers: store.metaReducers }),
		provideEffects(store.effectList()),
		provideStoreDevtools(),
		provideAppInitializer(appInitializer),
		{ provide: LOCALE_ID, useValue: 'de-DE' },
		...appServices
	]

};
