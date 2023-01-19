import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark } from 'blueprints';
import { Observable, of } from 'rxjs';
import * as actions from 'store';
import * as selectors from 'store';

@Component({
	selector: 'app-bookmark-edit-container',
	templateUrl: './bookmark-edit-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkEditContainerComponent {

	bookmark$: Observable<Bookmark>;

	constructor(
		private store: Store
	) {

		this.bookmark$ = of({} as Bookmark); // store.select(selectors.activeEntity);

	}

	onSave(bookmark: Bookmark): void {

		// this.store.dispatch(
		// 	actions.modifyEntity({
		// 		entity: Entities.bookmarks,
		// 		id: bookmark.id,
		// 		body: bookmark,
		// 		after: { redirect: true, showSuccess: true }
		// 	})
		// );

	}

}
