import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';

const routes: Route[] = [
	{
		path: '',
		component: BookmarksPageComponent,
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class BookmarkRoutingModule { }
