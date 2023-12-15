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
		path: 'edit/:id',
		component: NoteFormPageComponent
	},
	{
		path: 'new',
		component: NoteFormPageComponent
	},
	{
		path: ':id',
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
