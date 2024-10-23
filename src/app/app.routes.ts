import { Routes } from '@angular/router';
import { PageNotFoundComponent } from 'pages/page-not-found.component';

export const routes: Routes = [

	{

		path: '',
		loadComponent: () => import('../pages/home-page/home-page.component').then(c => c.HomePageComponent)

	},
	{

		path: 'bookmarks',
		loadComponent: () => import('../pages/bookmarks-page/bookmarks-page.component').then(c => c.BookmarksPageComponent)

	},
	{

		path: 'notes',
		loadComponent: () => import('../pages/notes-page/notes-page.component').then(c => c.NotesPageComponent)

	},
	{

		path: 'words',
		loadComponent: () => import('../pages/words-page/words-page.component').then(c => c.WordsPageComponent)

	},
	{

		path: 'projects',
		loadComponent: () => import('../pages/projects-page/projects-page.component').then(c => c.ProjectsPageComponent)

	},
	{

		path: 'learning',
		loadComponent: () => import('../pages/answers-page/answers-page.component').then(c => c.AnswersPageComponent)

	},
	{

		path: 'cloud',
		loadComponent: () => import('../pages/cloud-page/cloud-page.component').then(c => c.CloudPageComponent)

	},
	{

		path: 'logs',
		loadComponent: () => import('../pages/logs-page/logs-page.component').then(c => c.LogsPageComponent)

	},
	{

		path: 'database',
		loadComponent: () => import('../pages/database-page/database-page.component').then(c => c.DatabasePageComponent)

	},
	{

		path: 'settings',
		loadComponent: () => import('../pages/settings-page/settings-page.component').then(c => c.SettingsPageComponent)

	},
	{ path: '**', component: PageNotFoundComponent }

];
