import { bookmarkActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BookmarkComponent } from '@components/bookmark/bookmark.component';
import { UUID } from '@constants';
import { BaseComponent } from '@libComponents';
import { ClickedBookmark } from '@models';
import { Store } from '@ngrx/store';
import { selBM_filteredBookmarks, selBookmark_EntityCount } from '@selectors';
import { Observable, map } from 'rxjs';

@Component({
	standalone: true,
	imports: [ BookmarkComponent, AsyncPipe ],
	selector: 'app-bookmarks-container',
	templateUrl: './bookmarks.container.html',
	host: { 'class': 'gap-1 md:gap-2 grid @2xl/page:grid-cols-2 @4xl/page:grid-cols-3 @6xl/page:grid-cols-4' }
})
export class BookmarksContainer extends BaseComponent {

	private store: Store = inject(Store);
	bookmarks$: Observable<ClickedBookmark[]>;
	count$: Observable<number>;

	constructor() {

		super();
		this.bookmarks$ = this.store.select(selBM_filteredBookmarks).pipe(
			map(bookmarks => bookmarks.sort((b1, b2) => b2.clicks - b1.clicks))
		);
		this.count$ = this.store.select(selBookmark_EntityCount);

	}

	onEdit(id: UUID): void {

		this.store.dispatch(bookmarkActions.openEditDialog({ id }));

	}

	onPopular(id: UUID): void {

		this.store.dispatch(bookmarkActions.togglePopularTag({ id }));

	}

	onClick(id: UUID): void {

		this.store.dispatch(bookmarkActions.click({ id }));

	}

}
