import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-bookmark-list-page',
	templateUrl: './bookmark-list-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkListPageComponent implements OnInit {

	constructor(private store: Store) { }

	ngOnInit(): void {

		// this.store.dispatch(
		// 	actions.activateEntity({
		// 		entityName: Entities.bookmarks.plural
		// 	})
		// );

	}

}
