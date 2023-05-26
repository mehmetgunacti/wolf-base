import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { bookmarks } from 'bookmarks';
import { LocalStorageService, WolfBaseTableName } from 'lib';
import * as fromBookmark from 'store/bookmark';
import * as fromCore from 'store/core';
import { slideUpDownTrigger } from 'modules/shared';
import { Observable } from 'rxjs';

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
	selectedTags$: Observable<string[]>;

	private store: Store = inject(Store);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);


	constructor() {

		this.editDialogVisible$ = this.store.select(fromBookmark.isEditDialogVisible);
		this.tagsVisible$ = this.store.select(fromBookmark.selectorTagCloudVisibility);
		this.isBigScreen$ = this.store.select(fromCore.isBigScreen);
		this.selectedTags$ = this.store.select(fromBookmark.selectedTags);

		// todo : delete later
		this.localStorage.clear(WolfBaseTableName.bookmarks);
		this.localStorage.bookmarks.create(bookmarks);

	}

	onSearch(term: string): void {

		this.store.dispatch(fromBookmark.search({ term }));

	}

	toggleTagCloud(): void {

		this.store.dispatch(fromBookmark.toggleSearchAndTagCloudVisibility());

	}

	openAddDialog(): void {

		this.store.dispatch(fromBookmark.openAddBookmarkDialog());

	}

	closeAddDialog(): void {

		this.store.dispatch(fromBookmark.closeEditBookmarkDialog());

	}

	onTagClicked(name: string): void {

		this.store.dispatch(fromBookmark.clickTag({ name }));

	}

	emptyFilter(): void {

		this.store.dispatch(fromBookmark.emptySelectedTags());

	}

}
