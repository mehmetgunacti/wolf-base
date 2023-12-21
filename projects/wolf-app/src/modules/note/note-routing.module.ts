import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { setSelectedIdGuard } from './note.guard';
import { NoteFormPageComponent } from './pages/note-form-page/note-form-page.component';
import { NotePageComponent } from './pages/note-page/note-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { NoteContentFormPageComponent } from './pages/note-content-form-page/note-content-form-page.component';

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
		component: NotePageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id/edit',
		component: NoteFormPageComponent,
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
