import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark } from 'lib';
import * as actions from 'store';

@Component({
	selector: 'app-bookmark-new-container',
	templateUrl: './bookmark-new-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkNewContainerComponent {

	constructor(
		private store: Store
	) {	}

	onSave(bookmark: Bookmark): void {

		// this.store.dispatch(
		// 	actions.createEntity({
		// 		entity: Entities.bookmarks,
		// 		body: bookmark,
		// 		after: { redirect: true, showSuccess: true }
		// 	})
		// );

	}

}
