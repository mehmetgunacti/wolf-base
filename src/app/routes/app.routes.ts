import { Routes } from '@angular/router';
import { PageNotFoundPage } from '@pages/page-not-found.page';

export const routes: Routes = [

	{

		path: '',
		loadChildren: () => import('./home.routes').then(c => c.FEATURE_ROUTES)

	},
	{

		path: 'bookmarks',
		loadChildren: () => import('./bookmarks.routes').then(m => m.FEATURE_ROUTES)

	},
	{

		path: 'notes',
		loadChildren: () => import('./notes.routes').then(m => m.FEATURE_ROUTES)

	},
	{

		path: 'words',
		loadChildren: () => import('./words.routes').then(m => m.FEATURE_ROUTES)

	},
	{

		path: 'projects',
		loadChildren: () => import('./projects.routes').then(m => m.FEATURE_ROUTES)

	},
	{

		path: 'test-suites',
		loadChildren: () => import('./test-suites.routes').then(m => m.FEATURE_ROUTES)

	},
	{

		path: 'cloud',
		loadChildren: () => import('./cloud.routes').then(m => m.FEATURE_ROUTES)

	},
	{

		path: 'logs',
		loadChildren: () => import('./logs.routes').then(m => m.FEATURE_ROUTES)

	},
	{

		path: 'database',
		loadChildren: () => import('./database.routes').then(m => m.FEATURE_ROUTES)

	},
	{

		path: 'settings',
		loadChildren: () => import('./settings.routes').then(m => m.FEATURE_ROUTES),

	},
	{ path: '**', component: PageNotFoundPage }

];
