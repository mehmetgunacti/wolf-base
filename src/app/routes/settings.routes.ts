import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/settings-page/settings-page.component').then(c => c.SettingsPageComponent),
	},
	{

		path: 'components',
		loadComponent: () => import('pages/components-page/components-page.component').then(c => c.ComponentsPageComponent)

	}

];
