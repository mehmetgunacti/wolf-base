import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { setSelectedIdGuard } from './note.guard';
import { NoteContentFormPageComponent } from './pages/note-content-form-page/note-content-form-page.component';
import { NoteEditFormPageComponent } from './pages/note-edit-form-page/note-form-edit-page.component';
import { NoteNewFormPageComponent } from './pages/note-new-form-page/note-new-form-page.component';
import { NotePageComponent } from './pages/note-page/note-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';

const routes: Route[] = [
	{
		path: '',
		component: NotesPageComponent,
	},
	{
		path: 'new',
		component: NoteNewFormPageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id',
		component: NotePageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id/new',
		component: NoteNewFormPageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id/edit',
		component: NoteEditFormPageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id/content/edit',
		component: NoteContentFormPageComponent,
		canActivate: [setSelectedIdGuard]
	}

];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class NoteRoutingModule { }
