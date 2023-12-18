import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { NoteFormPageComponent } from './pages/note-form-page/note-form-page.component';

const routes: Route[] = [
	{
		path: '',
		component: NotesPageComponent,
	},
	{
		path: 'new',
		component: NoteFormPageComponent
	},
	{
		path: ':id',
		component: NoteFormPageComponent
	},
	{
		path: ':id/edit',
		component: NoteFormPageComponent
	},
	{
		path: ':id/content/edit',
		component: NoteFormPageComponent
	}

];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class NoteRoutingModule { }
