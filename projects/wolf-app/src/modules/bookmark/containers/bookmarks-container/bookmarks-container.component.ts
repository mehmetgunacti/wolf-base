import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClickedBookmark, UUID } from 'lib';
import { Observable, map } from 'rxjs';
import { click, openEditBookmarkDialog, togglePopular } from 'store/actions/bookmark.actions';
import { filteredBookmarks } from 'store/selectors/bookmark-selectors/bookmark-tags.selectors';

@Component({
	selector: 'app-bookmarks-container',
	templateUrl: './bookmarks-container.component.html',
	styleUrls: ['./bookmarks-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksContainerComponent {

	private store: Store = inject(Store);
	bookmarks$: Observable<ClickedBookmark[]>;

	constructor() {

		this.bookmarks$ = this.store.select(filteredBookmarks).pipe(
			map(bookmarks => bookmarks.sort((b1, b2) => b2.clicks - b1.clicks))
		);

	}

	onEdit(id: UUID): void {

		this.store.dispatch(openEditBookmarkDialog({ id }));

	}

	onPopular(id: UUID): void {

		this.store.dispatch(togglePopular({ id }));

	}

	onClick(id: UUID): void {

		this.store.dispatch(click({ id }));

	}

}
