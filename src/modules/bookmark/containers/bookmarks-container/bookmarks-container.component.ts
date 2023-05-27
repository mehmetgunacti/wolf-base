import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark, UUID } from 'lib';
import { Observable } from 'rxjs';
import * as actions from 'store/bookmark/actions';
import * as selectors from 'store/bookmark/selectors';

@Component({
	selector: 'app-bookmarks-container',
	templateUrl: './bookmarks-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksContainerComponent implements OnInit {

	bookmarks$: Observable<Bookmark[]>;

	constructor(
		private store: Store
	) {

		this.bookmarks$ = store.select(selectors.filteredBookmarks);

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

		this.store.dispatch(actions.openEditBookmarkDialog({ id }));

	}

	onPopular(id: UUID): void {

		this.store.dispatch(actions.togglePopular({ id }));

	}

}