import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { KBContentFormPageComponent } from './pages/kb-content-form-page/kb-content-form-page.component';
import { KBEntryFormPageComponent } from './pages/kb-entry-form-page/kb-entry-form-page.component';
import { KBEntryListPageComponent } from './pages/kb-entry-list-page/kb-entry-list-page.component';
import { KBEntryPageComponent } from './pages/kb-entry-page/kb-entry-page.component';
import { kbEntryGuard } from './kb-entry.guard';

const routes: Route[] = [

	{
		path: '',
		component: KBEntryListPageComponent
	},
	{
		path: 'new',
		component: KBEntryFormPageComponent
	},
	{
		path: ':id',
		component: KBEntryPageComponent
	},
	{
		path: ':id/edit',
		component: KBEntryFormPageComponent,
		canActivate: [kbEntryGuard]
	},
	{
		path: ':id/edit/content',
		component: KBContentFormPageComponent
	},

];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class KnowledgeBaseRoutingModule { }
