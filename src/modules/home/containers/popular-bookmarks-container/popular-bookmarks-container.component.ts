import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ClickedBookmark, TAG_POPULAR, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { click } from 'store/actions/bookmark.actions';
import * as bmSelectors from 'store/selectors/bookmark-selectors/bookmark-clicks.selectors';
import * as coreSelectors from 'store/selectors/core-configuration.selectors';

@Component({
	selector: 'app-popular-bookmarks-container',
	templateUrl: './popular-bookmarks-container.component.html',
	styleUrls: ['./popular-bookmarks-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularBookmarksContainerComponent implements OnInit {

	bookmarks$: Observable<ClickedBookmark[]>;
	tags$: Observable<string[]>;

	private store: Store = inject(Store);

	constructor() {

		this.bookmarks$ = this.store.select(bmSelectors.selBookmark_array).pipe(
			map(bookmarks => bookmarks.filter(b => b.tags.includes(TAG_POPULAR))),
			map(bookmarks => bookmarks.sort((b1, b2) => b2.clicks - b1.clicks))
		);
		this.tags$ = this.store.select(coreSelectors.selCore_popularBookmarks);

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
