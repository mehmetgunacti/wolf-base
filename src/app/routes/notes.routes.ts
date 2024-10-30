import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/notes-page/notes-page.component').then(c => c.NotesPageComponent)

	}

];
