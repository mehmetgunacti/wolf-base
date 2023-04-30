import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, InjectionToken, Provider } from '@angular/core';
import { Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DEFAULT_THEME, LocalStorageService } from 'lib';
import { MessageService } from 'primeng/api';
import { CustomErrorHandler, localStorageServiceFactory, remoteStorageServiceFactory } from 'services';
import * as actions from 'store/actions';
import * as states from 'store/states';
import { resolveTheme } from 'utils';

export const routes: Routes = [

	{

		path: '',
		loadChildren: () => import('../modules/core/core.module').then(m => m.CoreModule)

	}

];

const appInitializerFactory = (store: Store<states.AppState>) => {

	return () => {

		// set theme
		const lsTheme = localStorage.getItem('theme');
		const newTheme = !!lsTheme ? resolveTheme(lsTheme) : DEFAULT_THEME;
		store.dispatch(actions.themeSet({ newTheme }));

		// set lang
		// const lsLang = localStorage.getItem('lang');
		// const newLang = !!lsLang ? resolveLang(lsLang) : DEFAULT_LANG;
		// store.dispatch(actions.i18nSetLanguage({ newLang }));

	};

}

export function HttpLoaderFactory(http: HttpClient) {

	return new TranslateHttpLoader(http);

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