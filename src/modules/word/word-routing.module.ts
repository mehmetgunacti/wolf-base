import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { WordEditFormPageComponent } from './pages/word-edit-form-page/word-form-edit-page.component';
import { WordNewFormPageComponent } from './pages/word-new-form-page/word-new-form-page.component';
import { WordPageComponent } from './pages/word-page/word-page.component';
import { WordsPageComponent } from './pages/words-page/words-page.component';
import { setSelectedIdGuard } from './word.guard';

const routes: Route[] = [
	{
		path: '',
		component: WordsPageComponent,
	},
	{
		path: 'new',
		component: WordNewFormPageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id',
		component: WordPageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id/new',
		component: WordNewFormPageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id/edit',
		component: WordEditFormPageComponent,
		canActivate: [setSelectedIdGuard]
	}

];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class WordRoutingModule { }
