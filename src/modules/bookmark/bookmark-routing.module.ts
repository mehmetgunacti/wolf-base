import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BookmarkEditPageComponent } from './pages/bookmark-edit-page/bookmark-edit-page.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { BookmarkNewPageComponent } from './pages/bookmark-new-page/bookmark-new-page.component';

const routes: Route[] = [
	{
		path: '',
		component: BookmarksPageComponent,
	},
	{
		path: ':id/edit',
		component: BookmarkEditPageComponent,
	},
	{
		path: 'new',
		component: BookmarkNewPageComponent,
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class BookmarkRoutingModule { }
