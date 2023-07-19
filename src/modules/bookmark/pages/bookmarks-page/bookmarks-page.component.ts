import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { slideUpDownTrigger } from 'modules/shared';
import { Observable } from 'rxjs';
import { BookmarkActions } from 'store/actions';
import * as fromBookmark from 'store/bookmark';
import * as fromCore from 'store/core';

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

	constructor() {

		this.editDialogVisible$ = this.store.select(fromBookmark.isEditDialogVisible);
		this.tagsVisible$ = this.store.select(fromBookmark.selectorTagCloudVisibility);
		this.isBigScreen$ = this.store.select(fromCore.isBigScreen);
		this.selectedTags$ = this.store.select(fromBookmark.selectedTags);

	}

	onSearch(term: string): void {

		this.store.dispatch(BookmarkActions.Tags.search({ term }));

	}

	toggleTagCloud(): void {

		this.store.dispatch(BookmarkActions.UI.toggleSearchAndTagCloudVisibility());

	}

	openAddDialog(): void {

		this.store.dispatch(BookmarkActions.UI.openAddBookmarkDialog());

	}

	closeAddDialog(): void {

		this.store.dispatch(BookmarkActions.UI.closeEditBookmarkDialog());

	}

	onTagClicked(name: string): void {

		this.store.dispatch(BookmarkActions.Tags.clickTag({ name }));

	}

	emptyFilter(): void {

		this.store.dispatch(BookmarkActions.Tags.emptySelectedTags());

	}

}
