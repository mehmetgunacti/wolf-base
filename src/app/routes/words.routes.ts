import { Routes } from '@angular/router';
import { setSelectedIdGuard } from './guards/word.guard';

export const FEATURE_ROUTES: Routes = [

	{

		path: 'new',
		loadComponent: () => import('pages/word-new-form.page').then(c => c.WordNewFormPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: ':id',
		loadComponent: () => import('pages/word.page').then(c => c.WordPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: ':id/edit',
		loadComponent: () => import('pages/word-edit-form.page').then(c => c.WordEditFormPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: '',
		loadComponent: () => import('pages/words.page').then(c => c.WordsPage)

	}

];
