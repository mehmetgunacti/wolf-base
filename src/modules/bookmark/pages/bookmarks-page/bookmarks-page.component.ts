import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { LocalStorageService, WolfBaseTableName } from 'lib';
import * as fromStore from 'modules/bookmark/store';
import { slideUpDownTrigger } from 'modules/shared';
import { Observable, tap } from 'rxjs';
import { isBigScreen } from 'store';
import { bookmarks } from 'bookmarks';

@Component({
	selector: 'app-bookmarks-page',
	templateUrl: './bookmarks-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [slideUpDownTrigger]
})
export class BookmarksPageComponent {

	editDialogVisible$: Observable<boolean>;
	tagsVisible$: Observable<boolean>;
	isBigScreen$: Observable<boolean>;

	private store: Store = inject(Store);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);


	constructor() {

		this.editDialogVisible$ = this.store.select(fromStore.isEditDialogVisible);
		this.tagsVisible$ = this.store.select(fromStore.selectorTagCloudVisibility);
		this.isBigScreen$ = this.store.select(isBigScreen).pipe(tap(a => console.log(a)));

		// todo : delete later
		this.localStorage.clear(WolfBaseTableName.bookmarks);
		this.localStorage.bookmarks.create(bookmarks);

	}

	toggleTagCloud(): void {

		this.store.dispatch(fromStore.toggleSearchAndTagCloudVisibility());

	}

	openAddDialog(): void {

		this.store.dispatch(fromStore.openAddBookmarkDialog());

	}

	closeAddDialog(): void {

		this.store.dispatch(fromStore.closeEditBookmarkDialog());

	}

}
