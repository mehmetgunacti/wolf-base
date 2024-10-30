import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/words-page/words-page.component').then(c => c.WordsPageComponent)

	}

];
