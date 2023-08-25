import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark, POPULAR, UUID } from 'lib';
import { Observable, map, tap } from 'rxjs';
import { clickBookmark } from 'store/actions/bookmark.actions';
import * as selectors from 'store/selectors/bookmark-entities.selectors';

@Component({
	selector: 'app-popular-bookmarks-container',
	templateUrl: './popular-bookmarks-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularBookmarksContainerComponent implements OnInit {

	bookmarks$: Observable<Bookmark[]>;

	constructor(private store: Store) {

		this.bookmarks$ = store.select(selectors.selBookmarksArray).pipe(
			map(bookmarks => bookmarks.filter(b => b.tags.includes(POPULAR)))
		);

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

	onClick(id: UUID): void {

		this.store.dispatch(clickBookmark({ id }));

	}

}