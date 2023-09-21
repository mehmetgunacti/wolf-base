import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterModule, RouterStateSnapshot } from '@angular/router';
import { KBContentFormPageComponent } from './pages/kb-content-form-page/kb-content-form-page.component';
import { KBEntryFormPageComponent } from './pages/kb-entry-form-page/kb-entry-form-page.component';
import { KBEntryListPageComponent } from './pages/kb-entry-list-page/kb-entry-list-page.component';
import { KBEntryPageComponent } from './pages/kb-entry-page/kb-entry-page.component';
import { Store } from '@ngrx/store';
import { UUID } from 'lib';

function idResolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
	const store: Store = inject(Store);
	const id: UUID | null = route.paramMap.get('id');
	console.log(id);
	console.log('title=', route.title);
	// return store.dispatch(selectKBEntry({ id }));
}

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
		data: { computer: 'mycomputer' },
		resolve: idResolver
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
