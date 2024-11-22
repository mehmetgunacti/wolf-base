import { Routes } from '@angular/router';
import { setSelectedIdGuard } from './guards/word.guard';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/words.page').then(c => c.WordsPage)

	},
	{

		path: ':id',
		loadComponent: () => import('pages/word.page').then(c => c.WordPage),
		canActivate: [ setSelectedIdGuard ]

	},

];
