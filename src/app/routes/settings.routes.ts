import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/settings.page').then(c => c.SettingsPage),
	},
	{

		path: 'components',
		loadComponent: () => import('pages/showcase.page').then(c => c.ShowcasePage)

	},
	{

		path: 'quotes',
		loadComponent: () => import('pages/quote-settings.page').then(c => c.QuoteSettingsPage)

	}

];
