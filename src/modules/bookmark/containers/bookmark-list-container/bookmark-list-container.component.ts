import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark } from 'blueprints';
import { Observable, of } from 'rxjs';
import * as actions from 'store';
import * as selectors from 'store';

@Component({
	selector: 'app-bookmark-list-container',
	templateUrl: './bookmark-list-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkListContainerComponent implements OnInit {

	bookmarks$: Observable<Bookmark[]>;

	constructor(
		private store: Store
	) {

		this.bookmarks$ = of([]); // store.select(selectors.activeEntities);

	}

	ngOnInit(): void {

		// this.store.dispatch(
		// 	actions.loadEntities({
		// 		entity: Entities.bookmarks
		// 	})
		// );

	}

	onRefresh(): void {

		// this.store.dispatch(
		// 	actions.loadEntities({
		// 		entity: Entities.bookmarks,
		// 		skipCache: true
		// 	})
		// );

	}

}
