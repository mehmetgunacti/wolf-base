import { APP_INITIALIZER, ErrorHandler, InjectionToken, Provider } from '@angular/core';
import { Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { DEFAULT_THEME, LocalStorageService } from 'lib';
import { MessageService } from 'primeng/api';
import { CustomErrorHandler, localStorageServiceFactory, remoteStorageServiceFactory } from 'services';
import { AppState } from 'store/app.state';
import * as actions from 'store/core/actions';
import { resolveTheme } from 'utils';

export const routes: Routes = [

	{

		path: '',
		loadChildren: () => import('../modules/core/core.module').then(m => m.CoreModule)

	}

];

const appInitializerFactory = (store: Store<AppState>) => {

	return () => {

		// set theme
		const lsTheme = localStorage.getItem('theme');
		const newTheme = !!lsTheme ? resolveTheme(lsTheme) : DEFAULT_THEME;
		store.dispatch(actions.themeSet({ newTheme }));

	};

}

export const LOCAL_STORAGE_SERVICE = new InjectionToken<LocalStorageService>('LocalStorageService');
export const REMOTE_STORAGE_SERVICE = new InjectionToken<LocalStorageService>('RemoteStorageService');

export const providers: Provider[] = [

	{

		// when Angular initializes
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
	{ provide: LOCAL_STORAGE_SERVICE, useFactory: localStorageServiceFactory },
	{ provide: REMOTE_STORAGE_SERVICE, useFactory: remoteStorageServiceFactory },
	MessageService

];