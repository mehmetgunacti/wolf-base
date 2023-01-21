import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, Provider } from '@angular/core';
import { Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LANG, ThemeInfo, THEME_LIGHT } from 'lib';
import { MessageService } from 'primeng/api';
import { CustomErrorHandler } from 'services';
import * as actions from 'store/actions';
import * as states from 'store/states';
import { resolveLang, resolveTheme } from 'utils';

const DEFAULT_THEME: ThemeInfo = THEME_LIGHT;
const DEFAULT_LANG: LANG = 'en';

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
		const lsLang = localStorage.getItem('lang');
		const newLang = !!lsLang ? resolveLang(lsLang) : DEFAULT_LANG;
		store.dispatch(actions.i18nSetLanguage({ newLang }));

	};

}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {

	return new TranslateHttpLoader(http);

}

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
	MessageService

];