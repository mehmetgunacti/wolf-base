import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/database.page').then(c => c.DatabasePage)

	},
	{

		path: 'entities',
		loadComponent: () => import('pages/database-entities.page').then(c => c.DatabaseEntitiesPage)

	},

];
