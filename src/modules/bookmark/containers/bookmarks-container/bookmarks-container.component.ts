import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark, UUID } from 'lib';
import { Observable } from 'rxjs';
import { openEditBookmarkDialog, togglePopular } from 'store/actions/bookmark-ui.actions';
import { clickBookmark } from 'store/actions/bookmark.actions';
import { filteredBookmarks } from 'store/selectors/bookmark-tags.selectors';

@Component({
	selector: 'app-bookmarks-container',
	templateUrl: './bookmarks-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksContainerComponent implements OnInit {

	private store: Store = inject(Store);
	bookmarks$: Observable<Bookmark[]>;

	constructor() {

		this.bookmarks$ = this.store.select(filteredBookmarks);

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

		this.store.dispatch(openEditBookmarkDialog({ id }));

	}

	onPopular(id: UUID): void {

		this.store.dispatch(togglePopular({ id }));

	}

	onClick(id: UUID): void {

		this.store.dispatch(clickBookmark({ id }));

	}

}