import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BookmarkEditPageComponent } from './pages/bookmark-edit-page/bookmark-edit-page.component';
import { BookmarkListPageComponent } from './pages/bookmark-list-page/bookmark-list-page.component';
import { BookmarkNewPageComponent } from './pages/bookmark-new-page/bookmark-new-page.component';
import { BookmarkOnePageComponent } from './pages/bookmark-one-page/bookmark-one-page.component';

const routes: Route[] = [
	{
		path: '',
		component: BookmarkListPageComponent,
	},
	{
		path: ':id/edit',
		component: BookmarkEditPageComponent,
	},
	{
		path: 'new',
		component: BookmarkNewPageComponent,
	},
	{
		path: ':id',
		component: BookmarkOnePageComponent,
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class BookmarkRoutingModule { }
