import { Routes } from '@angular/router';
import { setSelectedIdGuard } from './guards/note.guard';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/notes.page').then(c => c.NotesPage)

	},
	{

		path: ':id',
		loadComponent: () => import('pages/note.page').then(c => c.NotePage),
		canActivate: [ setSelectedIdGuard ]

	}

];
