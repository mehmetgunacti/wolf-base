import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';

const routes: Route[] = [
	{
		path: '',
		component: NotesPageComponent,
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class NoteRoutingModule { }
