import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark } from 'lib';
import { Observable, of } from 'rxjs';
import * as actions from 'store';
import * as selectors from 'modules/bookmark/store';

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

		this.bookmarks$ = store.select(selectors.selectorBookmarksArray);

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

}