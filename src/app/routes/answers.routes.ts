import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/answers-page/answers-page.component').then(c => c.AnswersPageComponent)

	}

];
