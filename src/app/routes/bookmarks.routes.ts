import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/bookmarks.page').then(c => c.BookmarksPage)

	}

];
