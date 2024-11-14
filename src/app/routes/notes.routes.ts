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

	},
	{

		path: 'new',
		loadComponent: () => import('pages/note-new-form.page').then(c => c.NoteNewFormPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: ':id/new',
		loadComponent: () => import('pages/note-new-form.page').then(c => c.NoteNewFormPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: ':id/edit',
		loadComponent: () => import('pages/note-edit-form.page').then(c => c.NoteEditFormPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: ':id/content/edit',
		loadComponent: () => import('pages/note-content-form.page').then(c => c.NoteContentFormPage),
		canActivate: [ setSelectedIdGuard ]

	}

];
