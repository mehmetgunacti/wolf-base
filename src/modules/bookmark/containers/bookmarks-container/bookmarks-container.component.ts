import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark, UUID } from 'lib';
import { Observable } from 'rxjs';
import { BookmarkActions } from 'store/actions';
import * as selectors from 'store/bookmark/selectors';

@Component({
	selector: 'app-bookmarks-container',
	templateUrl: './bookmarks-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksContainerComponent implements OnInit {

	private store: Store = inject(Store);
	bookmarks$: Observable<Bookmark[]>;

	constructor() {

		this.bookmarks$ = this.store.select(selectors.filteredBookmarks);

	}

	ngOnInit(): void {



	}

	onRefresh(): void {

		// this.store.dispatch(
		// 	actions.loadEntities({
		// 		entity: Entities.bookmarks,
		// 		skipCache: true
		// 	})
		// );

	}

	onEdit(id: UUID): void {

		this.store.dispatch(BookmarkActions.UI.openEditBookmarkDialog({ id }));

	}

	onPopular(id: UUID): void {

		this.store.dispatch(BookmarkActions.UI.togglePopular({ id }));

	}

	onClick(id: UUID): void {

		this.store.dispatch(BookmarkActions.clickBookmark({ id }));

	}

}