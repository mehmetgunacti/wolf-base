import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/settings-page/settings-page.component').then(c => c.SettingsPageComponent),
		children: [

			{
				path: 'components',
				loadComponent: () => import('pages/settings-components-page/settings-components-page.component').then(c => c.SettingsComponentsPageComponent)
			}

		]

	}

];
