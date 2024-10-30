import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/bookmarks-page/bookmarks-page.component').then(c => c.BookmarksPageComponent)

	}

];
