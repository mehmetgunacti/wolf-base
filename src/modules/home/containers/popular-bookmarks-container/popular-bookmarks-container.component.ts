import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClickedBookmark, TAG_POPULAR, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { click } from 'store/actions/bookmark.actions';
import * as bmSelectors from 'store/selectors/bookmark-selectors/bookmark-entities.selectors';

@Component({
	selector: 'app-popular-bookmarks-container',
	templateUrl: './popular-bookmarks-container.component.html',
	styleUrls: ['./popular-bookmarks-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularBookmarksContainerComponent implements OnInit {

	bookmarks$: Observable<ClickedBookmark[]>;

	constructor(private store: Store) {

		this.bookmarks$ = store.select(bmSelectors.selBMBookmarksArray).pipe(
			map(bookmarks => bookmarks.filter(b => b.tags.includes(TAG_POPULAR))),
			map(bookmarks => bookmarks.sort((b1, b2) => b2.clicks - b1.clicks))
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

		this.store.dispatch(click({ id }));

	}

}
